import mongoose from "mongoose";
import IMailLog from "../interfaces/IMailLog.js";

const MailLogSchema = new mongoose.Schema<IMailLog>({
        trackId: {
            type: String,
            required: true,
            unique: true
        },
        emailTarget:{
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["SENT", "FAILED"],
            required: true
        },
        subject:{
            type: String
        },
        errorMessage:{
            type: String
        },
        sentAt:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const MailLog = mongoose.model<IMailLog>('MailLog', MailLogSchema);
export default MailLog;