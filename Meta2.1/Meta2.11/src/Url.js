const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    // Configura las cabeceras de respuesta para indicar que se envía HTML
    res.setHeader('Content-Type', 'text/html');

    // Analiza la URL de la solicitud
    const parsedUrl = url.parse(req.url, true);
    const queryParams = parsedUrl.query;

    // Crea una respuesta HTML que muestra los datos recibidos en los parámetros
    const responseHTML = `
    <html>
      <head>
        <title>Respuesta HTTP con Parametros y Encabezados</title>
      </head>
      <body>
        <h1>Datos de la solicitud:</h1>
        <p>URL: ${req.url}</p>
        <p>Metodo: ${req.method}</p>
        <h2>Encabezados de la solicitud:</h2>
        <pre>${JSON.stringify(req.headers, null, 2)}</pre>
        <h2>Parametros de la URL:</h2>
        <p>Campo 1: ${queryParams.campo1}</p>
        <p>Campo 2: ${queryParams.campo2}</p>
      </body>
    </html>
  `;

    // Envía la respuesta HTML al cliente
    res.end(responseHTML);
});

const port = 4000; // Puerto en el que se ejecutará el servidor

server.listen(port, () => {
    console.log(`Servidor HTTP en ejecución en el puerto ${port}`);
});
