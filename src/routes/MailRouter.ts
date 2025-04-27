import MailController from "../controllers/MailController.js";
import router from "./router.js";

router.post('/email-queue', MailController.sendEmailBody.bind(MailController))
router.get('/email-logs/:id',MailController.getEmailByTrackId.bind(MailController))
router.get('/email-logs', MailController.getEmails.bind(MailController))