import express from "express";
import  "./worker/worker";

const app = express();

app.get("/health",(req,res)=>{
    res.json({status : "ok"});
});


app.listen(process.env.PORT || 9003);
