import http from 'http';
import express from 'express';
import opener from 'opener';

const app = express();
const server = http.createServer(app);
const isHeroku = 'HEROKU_APP_NAME' in process.env;

app.use(express.static(__dirname + '/example'));

const port = process.env.PORT || 5000;
server.listen(port);
!isHeroku && opener(`http://localhost:${port}`);
