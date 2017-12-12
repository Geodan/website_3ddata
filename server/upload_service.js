/**
 * Kindly re-used from https://github.com/Geodan/postgis-mvt-server/blob/master/mvt_server.js
 * 
 * 
 */

const compression = require('compression');
const express = require('express');
const multer  = require('multer');
const app = express();
const Pool = require('pg').Pool;
const SQL = require('sql-template-strings');
const fs = require('fs-extra');
const unzip = require('unzip');
const ogr2ogr = require('ogr2ogr')
const g_config = require(__dirname + '/config/config.json');
const g_styletemplate = require(__dirname + '/config/styletemplate.json');
process.on('unhandledRejection', function(e) {
	console.log(e.message, e.stack);
})

const g_dbpools = {};
for (db in g_config.databases) {
	console.log("Setting up pool for database '" + db + "'");
	g_dbpools[db] = new Pool(g_config.databases[db]);
}
function unzipUpload(zipfile) {
	return new Promise(function(resolve, reject) {
		var output_dir = zipfile + '_unzip';
		if (!fs.existsSync(output_dir)){
			fs.mkdirSync(output_dir);
		}
		var result = '';
		fs.createReadStream(zipfile)
			.pipe(unzip.Parse())
			.on('entry', function (entry) {
				var fileName = entry.path;
				var type = entry.type;
//				console.log('entry ' + fileName);
				if (!result && type == 'File' && fileName.match(/^.+\.(json|geojson)$/)) {
//					console.log('unzipping ' + fileName);
					entry.pipe(fs.createWriteStream(output_dir + '/' + fileName));
					result = output_dir + '/' + fileName;
				} else {
					entry.autodrain();
				}
			})
			.on('close', function () {
				console.log('closed zip');
				if (!result) {
					reject('No geojson found in zip file'); return;
				}
				resolve(result);
			});
	});
}

function loadGeoJson(file) {
	var promises = [];
	var database = g_config.uploads.database;
	var host = g_config.databases[database].host;
	var port = g_config.databases[database].port;
	var user = g_config.databases[database].user;
	var pass = g_config.databases[database].password;
	var dbname = g_config.databases[database].database;
	var schema = g_config.uploads.schema;
	var pgstr = `PG:host=${host} port=${port} user=${user} dbname=${dbname}`;
	if (pass) pgstr = pgstr + ` password=${pass}`;
	
	return new Promise( function(resolve, reject) {
		console.log('loading geojson');
		var matches = file.match(/\/(\w+)_unzip\/(.+)\.(json|geojson)$/);
		var id = matches[1];
		var name = matches[2];
		
		ogr2ogr(file)
			.format('PostgreSQL')
			.options(['-nln', schema + '.' + id])
			.destination(pgstr)
			.timeout(60000)
			.exec(function(err) {
				if (err) {
					reject(err.message); return;
				}
				resolve({
					'id': id,
					'name': name
				});
			});
	});
}

function makeConfig(res) {
	var id = res.id;
	var name = res.name;
	return new Promise(function(resolve, reject) {
		var schema = g_config.uploads.schema;
		var pool = g_dbpools[g_config.uploads.database];
		//var query = `SELECT * FROM ${id} WHERE false`;
		var query = `SELECT column_name, udt_name FROM INFORMATION_SCHEMA.COLUMNS 
						WHERE table_schema = '${schema}' AND table_name = '${id}'`;
		pool.query(query).then(result => {
			var geom_column = '';
			var fields = result.rows.filter(row => {
				if (row.udt_name == 'geometry') {
					geom_column = row.column_name;
					return false;
				} else {
					return true;
				}
			}).map(row => {
				return row.column_name;
			});
			if (geom_column) {
				pool.query(`SELECT Find_SRID('${schema}', '${id}', '${geom_column}') srid, 
							GeometryType(${geom_column}) geom_type 
							FROM ${schema}."${id}" LIMIT 1`).then(result => {
					var srid = result.rows[0].srid;
					var geom_type = result.rows[0].geom_type;
					var source_config = {
						"name": name,
						"database": g_config.uploads.database,
						"table": `${schema}."${id}"`,
						"geometry": geom_column,
						"type": geom_type,
						"srid": srid,
						"minzoom": 0,
						"maxzoom": 22,
						"attributes": fields.join(', ')
					};
					var json = JSON.stringify(source_config, null, '\t');
					
					fs.writeFile(g_sourcedir + id + '.json', json, err => {
						if (err) {
							reject('Error writing source file for id: ' + id);
						} else {
							g_sources[id] = source_config;
							resolve(id);
						}
					});
				}).catch(reason => {
					reject('Error executing database query: ' + reason.message);
				});
			} else {
				reject('Unable to find geometry column');
			}
		}).catch(reason => {
			reject('Error executing database query: ' + reason.message);
		});
	});
}
const upload = multer({ dest: __dirname + '/' + g_config.uploads.directory });
app.post('/upload', upload.single('file'), function (req, res, next) {
	//console.log(req.file);
	function cleanup(path) {
		fs.remove(path);
		fs.remove(path + '_unzip');
	}
	if (req.file.mimetype == 'application/x-zip-compressed') {
		unzipUpload(req.file.path)
			.then(loadGeoJson)
			.then(makeConfig)
			.then( result => {
				console.log('Uploaded file with id ' + result);
				res.redirect('/html/maputnik/?style=' + req.headers.origin + '/style/' + result + '.json');
				cleanup(req.file.path);
			})
			.catch( reason => {
				console.log('Error loading geojson: ' + reason);
				res.status(400)
					.send('Error loading geojson: ' + reason);
				cleanup(req.file.path);
			});
	} else {
		res.status(400);
		res.send('Please upload a zipped geojson.');
		cleanup(req.file.path);
	}
});