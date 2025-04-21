interface IMailBody{
    trackId: string;
    emailTarget: string;
    subject: string;
    message: string;
    html?: string;
}

export default IMailBody;