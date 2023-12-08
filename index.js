const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url + '.html';

    if (filePath === './.html') {
        filePath = './404.html';
    }

    const contentType = 'text/html';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.readFile('./404.html', (err, notFoundContent) => {
                    if (err) {
                        // Error reading 404 page
                        res.writeHead(500, { 'Content-Type': 'text/plain' });
                        res.end('Internal Server Error');
                    } else {
                        // Send a 404 response with the content of the 404 page
                        res.writeHead(404, { 'Content-Type': contentType });
                        res.end(notFoundContent, 'utf-8');
                    }
                });
            } else {
                // Other server error
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Internal Server Error');
            }
        } else {
            // If the file is found, send a 200 response with the file content
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

const PORT = 8080;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
