import { PrismaClient } from "@prisma/client";

const dotenv = require('dotenv');
dotenv.config();

const accountSid = 'ACc42239c6272c09649843c692d2e723f9';
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const formData = await req.json();
    const message = formData['message'];
    console.log('message', message);

    client.messages
        .create({
            body: 'Thanks for submitting a report! Our team of high trained marine biologists will be on the case shortly.',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+18083880313'
        })
        .then((message: any) => console.log(message.sid));

    return Response.json({
        Fuck: "This"
    });
}
