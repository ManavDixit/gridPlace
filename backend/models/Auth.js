import mongoose from "mongoose";
const SignupSchema = mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:false,default:''},
    hasPlaced:{type:Boolean,default:false},
});
const model=mongoose.model('user',SignupSchema);
export default model;