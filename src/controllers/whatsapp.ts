import { Client, LocalAuth } from 'whatsapp-web.js';
import asyncHandler from '../middleware/async';
import { sendResponse, sendError } from '../libraries/rest';
import { Request, Response } from 'express';
import qrcode_terminal from 'qrcode-terminal';
import qrcode from 'qrcode';
import axios from 'axios';

const client = new Client({
    puppeteer: {
        headless: true,
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--single-process", // <- this one doesn't works in Windows
          "--disable-gpu",
        ],
      },
      authStrategy: new LocalAuth({
          clientId: 'yusep2',
      }),
})

client.on('qr', (qr) => {
    console.log('QR RECEIVED', qr);
    qrcode_terminal.generate(qr, {small: true});
})

client.on('ready', () => {
    console.log('Client is ready!');
})

client.on('message', async msg => {
    if (msg.body == 'Hi') {
        msg.reply('Welcome to whatsapp bot');
    }
    console.log(msg)
    const number = msg.from;
    const message = msg.body;

    axios.post(process.env.WHATSAPP_CLIENT_URL + '/api/v1/whatsapp/send-message', {
        number: number,
        message: message
    })
})

client.initialize();

export const generate = asyncHandler(async (req : Request<never, never, never, never>, res : Response, next : any) => {
    client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
        qrcode_terminal.generate(qr, {small: true});
        qrcode.toDataURL(qr, (err : any, url : any) => {
            var imageHtml = '<img src="' + url + '">';
            res.send(imageHtml);
        })
    })

    client.on('ready', () => {
        console.log('Client is ready!');
        res.send('Client is ready!');
    })

    client.on('message', async msg => {
        if (msg.body == 'Hi') {
            msg.reply('Welcome to whatsapp bot');
        }
        const number = msg.from;
        const message = msg.body;

        axios.post(process.env.WHATSAPP_CLIENT_URL + '/api/v1/whatsapp/send-message', {
            number: number,
            message: message
        })
            .then((res) => {
                console.log('response : ', res);
            })
    })

    client.initialize();
})

export const sendMessage = asyncHandler(async (req : Request<never, never, {number : string, message: string}, never>, res : any, next : any) => {
    let { number, message } = req.body;

    if (!number.includes('@c.us')) {
        number += '@c.us';
    }

    console.log('number : ', number);
    console.log('message : ', message);

    try {
        client.getChatById(number).then((chat) => {
            chat.sendMessage(message);
        })
        res.status(200).json(new sendResponse('Success sending message',[]));
    } catch (error) {
        res.status(500).json(new sendError('Failed send message', 'SERVER_ERROR', [], 500));
    }

    res.json(new sendResponse("Message sent", []));
})