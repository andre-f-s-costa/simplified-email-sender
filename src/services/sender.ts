import amqp from 'amqplib';
import IMailBody from '../interfaces/IMailBody.js';
import { config } from 'dotenv';

config()

const sendEmailService = async (body: IMailBody):Promise<void> => {
    const amqpURL = process.env.RABBITMQ_URL
    
    if (!amqpURL) {
        throw new Error('No url provided');
    }

    const emailDetails = {
        trackId: body.trackId,
        to: body.emailTarget,
        subject: body.subject,
        text: body.message,
        html: body.html
    };

    const connection = await amqp.connect(amqpURL, (err:any, conn:any) => {
        err?console.error(`rabbitmq not connected: ${err}`):console.log('rabbitmq connected succesfully');
    });

    const channel = await connection.createChannel();
    const queue = 'email_queue';

    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(emailDetails)), {
        persistent: true
    });

    setTimeout(() => {
        connection.close();
    }, 1000);
}

export default sendEmailService;