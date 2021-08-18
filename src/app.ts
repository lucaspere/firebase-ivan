import * as http from 'http';

const server = http.createServer((req, res) => {
    res.end('<h1>Init</h1>');
});

server.listen(3000);
