import { NextFunction, Request, Response } from "express";
import sendEmailService from "../services/sender.js";
import MailLogService from "../services/MailLogService.js";

class MailController{
    // custom method to send the email body directly to the queue
    static async sendEmailBody(req: Request, res: Response, next: NextFunction):Promise<void> {
        const trackId = crypto.randomUUID();
        try {
            await sendEmailService({...req.body, trackId: trackId});
            res.status(202).json(`Email sent to queue. You can check the status of this email using the id: ${trackId}`);
            return;
        } catch (error) {
            if (!res.headersSent) {
                res.status(500).json(error);
            }
        }
    }

    static async getEmailByTrackId(req: Request, res: Response, next: NextFunction):Promise<void> {
        const {status, response} = await MailLogService.readOne(req.params.id);
        res.status(status).json(response);
        return;
    }

    static async getEmails(req: Request, res: Response, next: NextFunction):Promise<void> {
        const {status, response} = await MailLogService.readAll();
        res.status(status).json(response);
        return;
    }
}

export default MailController;