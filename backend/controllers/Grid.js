import Grid from "../models/Grid.js";
import User from "../models/Auth.js";
import { Socket } from "socket.io";
import { getIo } from "../websockets/socket.js";
export const markCell = async (req, res) => {
     /** @type {import("socket.io").Server} */
    const io=getIo();
    const {row,col}=req.body;
    const user=await User.findOne({email:req.user});
    const hasPlaced=user.hasPlaced;
    if(hasPlaced){
        return res.status(400).json({success:false,error:"User has already placed a mark"});
    }
    try {
        let grid=await Grid.findOne();
        if(!grid){
            grid=new Grid();
        }
        const newData=grid.data.map((r,i)=>r.map((c,j)=>{
            if(i===row && j===col && c.marked===false){
                return {...c,marked:true,user:user.email};
            }
            return c;
        }))
        grid.data=newData;
        io.emit("gridUpdated",newData);
        await grid.save();
        user.hasPlaced=true;
        await user.save();
        res.status(200).json({success:true,data:grid.data,hasPlaced:true});
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,error});
    }
};

export const getGridData=async(req,res)=>{
    try {
        let grid=await Grid.findOne();
        if(!grid){
            grid=new Grid();
            await grid.save();
        }
        const user=await User.findOne({email:req.user});
        res.status(200).json({success:true,data:grid.data,hasPlaced:user.hasPlaced});
    } catch (error) {
        console.log(error);
        res.status(400).json({success:false,error});
    }
}
