import path from 'path';
import http from 'http';
import express from 'express';
import compression from 'compression';

const app = express();
const server = http.createServer(app);

app.use(compression());
app.use(express.static(path.resolve('./example')));

const port = process.env.PORT || 5000;
server.listen(port);
