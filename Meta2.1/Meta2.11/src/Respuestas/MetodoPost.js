const http = require('http');
const querystring = require('querystring');
const fs = require('fs');

const server = http.createServer((req, res) => {
    // Configura las cabeceras de respuesta para indicar que se envía HTML
    res.setHeader('Content-Type', 'text/html');

    if (req.method === 'GET') {
        // Lógica para servir el formulario HTML
        fs.readFile('Formulario.html', 'utf8', (err, data) => {
            if (err) {
                res.statusCode = 500; // Código de estado para error del servidor
                res.end('Error interno del servidor');
                return;
            }

            res.statusCode = 200;
            res.end(data);
        });
    } else if (req.method === 'POST') {
        // Lógica para manejar la solicitud POST


        const requestHeaders = req.headers;


        let requestData = '';

        // Maneja el evento de recepción de datos del formulario
        req.on('data', (chunk) => {
            requestData += chunk;
        });

        // Maneja el evento cuando se completa la recepción de datos
        req.on('end', () => {
            // Analiza los datos enviados en la solicitud POST
            const postData = querystring.parse(requestData);

            // Obtén el URL
            const requestURL = req.url;

            // Realiza alguna lógica basada en los datos recibidos
            let responseHTML = `
                <html>
                  <head>
                    <title>Confirmacion de envío</title>
                  </head>
                  <body>
                    <h1>Gracias por enviar los datos:</h1>
                    <h2>URL:</h2>
                    <p>${requestURL}</p>
                    <h2>Request Headers:</h2>
                    <pre>${JSON.stringify(requestHeaders, null, 2)}</pre>
                    <h2>Datos enviados:</h2>
                    <ul>`;

            // Recorre todos los campos y agrega cada uno a la respuesta
            for (const key in postData) {
                responseHTML += `<li>${key}: ${postData[key]}</li>`;
            }

            responseHTML += `
                    </ul>
                  </body>
                </html>
            `;

            // Envía la respuesta HTML de confirmación al cliente
            res.statusCode = 200;
            res.end(responseHTML);
        });
    }
});

const port = 8000; // Puerto en el que se ejecutará el servidor

server.listen(port, () => {
    console.log(`Servidor HTTP en ejecución en el puerto ${port}`);
});
