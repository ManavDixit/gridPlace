
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectToDataBase from './db.js';
import AuthRoutes from './routes/Auth.js';
import GridRoutes from './routes/Grid.js';
import { connectToWebSocket } from "./websockets/socket.js";
import http from 'http';



// const hostname='192.168.1.43';
const port=process.env.PORT || 8000;

//connecting to database
connectToDataBase();
//inintializing express
const app=express();

//cretaing http server
const server=http.createServer(app);
//connecting to websockets
connectToWebSocket(process.env.FRONTEND_URL,server);
//enabling cors
app.use(cors());
//using bodyparser to parse data sended in request
app.use(express.json({extended:true,limit:'10mb'}));
app.use(express.urlencoded({extended:true,limit:'10mb'}));
app.use('/auth/',AuthRoutes);
app.use('/grid/',GridRoutes);
//listing to expess server
server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
});