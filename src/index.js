import dotenv from "dotenv"
import dbConnect from "./db/index.js";
import { app } from "./app.js";


const Port = process.env.PORT || 8000 

dotenv.config({
    path : './env'
})

dbConnect()
.then(()=>{
    app.on('error' , (error)=>{
        console.log('err in app.on db connect: ' , error);
    })
    app.listen(Port, ()=>{
        console.log(`server running on ${Port}`);
    })
})
.catch((err)=>{
    console.log(`Db connetn failed in index.js ${err}`);
}) 