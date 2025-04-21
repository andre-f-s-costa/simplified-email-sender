import { Request, Response, Router } from "express";

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send(`Server is running.`)
})

export default router;