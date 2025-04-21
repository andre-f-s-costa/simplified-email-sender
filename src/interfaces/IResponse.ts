import { Document } from "mongoose";

interface IResponse{
    status: number;
    response: string | Document | Document[]
}

export default IResponse;