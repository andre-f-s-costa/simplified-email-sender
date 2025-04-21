import amqp from 'amqplib';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import MailLogService from './MailLogService.js';

config()

const consumeMessageService = async ():Promise<void> => {
    const amqpURL = process.env.RABBITMQ_URL
    
    if (!amqpURL) {
        throw new Error('No url provided');
    }

    const connection = await amqp.connect(amqpURL, (err: any, conn: any) => {
        err?console.error(`rabbitmq not connected: ${err}`):console.log('rabbitmq connected succesfully');
    });

    const channel = await connection.createChannel();
    const queue = 'email_queue';

    await channel.assertQueue(queue, { durable: true });
    console.log(`Waiting for messages in queue: ${queue}`);

    channel.consume(queue, async (msg: amqp.ConsumeMessage | null) => {
        if (msg) {
            const emailData = JSON.parse(msg.content.toString());
            console.log(`Sending email to: ${emailData.to}`);

            // Here you can change the type of the email that will be sending
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com", // server
                port: 465, // server door
                secure: true, // activates SSL
                auth: {
                    user: process.env.SENDER_EMAIL, //set the email through environment variable
                    pass: process.env.SENDER_PASS //set the secret-pass through environment variable
                }
            });

            const mailInfo = {
                from: `'${process.env.SENDER_NAME}' <${process.env.SENDER_EMAIL}>`,
                to: emailData.to,
                subject: emailData.subject,
                text: emailData.text,
                html: emailData.html
            };

            try {
                await transporter.sendMail(mailInfo);
                channel.ack(msg);
                const result = await MailLogService.create({
                    trackId: emailData.trackId,
                    emailTarget: mailInfo.to,
                    subject: mailInfo.subject
                })
                console.log('log registered')
            } catch (error: any) {
                console.error(`Error sending email: ${error.message}`);
            }
        }
    });
}

export default consumeMessageService;