import { NextFunction, Request, Response } from "express";

export default (req:Request, res: Response, next: NextFunction):void => {
    console.log(`TYPE: ${req.method} - URL: ${req.url}`);
    if (req.body) {
        console.log(`Body: ${JSON.stringify(req.body, null, 2)}`)
    }
    if (req.params) {
        console.log(`Params: ${JSON.stringify(req.params, null, 2)}`)
    }
    next()
}