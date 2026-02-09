import mongoose from "mongoose";
const GridSchema = mongoose.Schema({
    data:{type:Array,default: Array(18).fill(Array(18).fill({user:null,marked:false}))},
});
const model=mongoose.model('grid',GridSchema);
export default model;