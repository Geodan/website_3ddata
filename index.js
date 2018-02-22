import '/src/website_3ddata-app/verkoop-app.js';
import '../../@webcomponents/webcomponentsjs/webcomponents-loader.js';
const $_documentContainer = document.createElement('div');
$_documentContainer.setAttribute('style', 'display: none;');

$_documentContainer.innerHTML = `<title>3Ddatalab</title><style>

    body {
      margin: 0;
      font-family: 'Roboto', 'Noto', sans-serif;
      background-color: white;
    }
    

  </style><verkoop-app unresolved="">3D datalab</verkoop-app>`;

document.head.appendChild($_documentContainer);

/**
@license geodan

*/
;
