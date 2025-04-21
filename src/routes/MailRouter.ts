import { NextFunction, Request, Response } from "express";
import MailController from "../controllers/MailController.js";
import router from "./router.js";

router.post('/post-email', MailController.sendEmailBody.bind(MailController))
router.get('/get-email/:id',MailController.getEmailByTrackId.bind(MailController))
router.get('/get-emails', MailController.getEmails.bind(MailController))