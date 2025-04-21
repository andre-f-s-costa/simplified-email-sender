import IMailLog from "../interfaces/IMailLog.js";
import IResponse from "../interfaces/IResponse.js";
import MailLog from "../models/MailLog.js";

class MailLogService{

    async create(data: {trackId: string, emailTarget: string, subject?: string}):Promise<IResponse> {
        const dateNow = new Date();

        const log:IMailLog = {
            trackId: data.trackId,
            emailTarget: data.emailTarget,
            status: 'SENT',
            subject: data.subject ? data.subject : '',
            sentAt: `${dateNow}`
        }
        
        try {
            const created = new MailLog(log);
            const savedSuccess = await created.save();
            return {status: 201, response: savedSuccess};
        } catch (error) {
            log.status = 'FAILED';
            log.errorMessage = JSON.stringify(error);
            const created = new MailLog(log);
            const savedFail = await created.save();
            return {status: 201, response: savedFail};
        }
    }

    async readOne(id: string):Promise<IResponse> {
        try {
            const found = await MailLog.findOne({trackId: id});
            if (found !== null) {
                return {status: 200, response: found};
            }
            return {status: 404, response: `object log of id ${id} not found`};
        }
        catch (error) {
            return {status: 500, response: `Error: ${error}`};
        }
    }

    async readAll():Promise<IResponse> {
        const found = await MailLog.find();
        return {status: 200, response: found};
    }

    async delete(id:string):Promise<IResponse> {
        try {
            const deleted = await MailLog.findByIdAndDelete(id);
            if (deleted!==null) {
                return {status: 204, response: ''};
            }
            return {status: 404, response: `object log of id ${id} not found`};
        }
        catch (error) {
            return {status: 500, response: `Error: ${error}`};
        }
    }

}

export default new MailLogService();