import * as dotenv from 'dotenv';
import express from 'express';
// import helmet from 'helmet';
import bodyParser from 'body-parser';
import whatsapp from './routes/whatsapp';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
import http = require('http');
const server = http.createServer(app);
app.use(bodyParser.json());
// app.use(helmet());
app.use('/api/v1/whatsapp', whatsapp);

app.get('/', (req : any, res : any) => {
    res.send('Express typescript server');
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
})