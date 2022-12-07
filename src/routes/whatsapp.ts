import express from 'express';
import { generate, sendMessage } from '../controllers/whatsapp';
const routes = express.Router();


routes
    .route('/generate')
    .get(generate)

routes
    .route('/send-message')
    .post(sendMessage)


export default routes;