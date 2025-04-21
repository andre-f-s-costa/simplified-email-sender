export default interface IMailLog{
    trackId: string;
    emailTarget: string;
    status: "SENT" | "FAILED";
    errorMessage?: string;
    subject?: string;
    sentAt: string
}