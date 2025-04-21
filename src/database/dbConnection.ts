import mongoose from "mongoose";
import { config } from "dotenv";

config();
const URL:string = process.env.DB_URL?process.env.DB_URL:''

const mongoconnect = ():Promise<typeof mongoose> => mongoose.connect(URL)

const handler = (connector:Promise<typeof mongoose>):void => {
    connector.then(() => {
        console.log('Database connected successfully');
    })
    .catch(err=>{
        console.error(`Not connected, something went wrong ${err}`);
    })
}

export default handler(mongoconnect());