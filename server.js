import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/userRoute.js";


const app = express();
app.use(bodyParser.json());


let mongoURL = "mongodb+srv://NSC:NSCcarrentals123@cluster0.gxsoc.mongodb.net/NSC?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(mongoURL);
let connection = mongoose.connection;
connection.once("open", ()=>{
    

    console.log("MongoDB connection established successfully!")
})

app.use(bodyParser.json());

app.listen(4000, ()=>{

    console.log('listening on Port 4000')

});

app.use((req,res,next)=>{


    let token = req.header("Authorization");

    if(token!=null) {

        token = token.replace("Bearer ","");
        console.log(token)
        jwt.verify(token, "Amindu123",(err,decoded)=>{

            console.log(err);
            if(!err){
                req.user = decoded ;
            }
        })
    }

    next()
})

app.use("/api/users",userRouter)



