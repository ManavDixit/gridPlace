import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Users from "../models/Auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import queryString from "query-string";

export const signUp = async (req, res) => {
  const {  email, password, confirmPassword } = req.body;
  //checking if user already exist
  let user = await Users.findOne({ email });
  if (user)
    return res
      .status(400)
      .send({ success: false, error: "user already exists" });
  //checking if password and confirm pasword matches
  if (password !== confirmPassword)
    return res
      .status(400)
      .send({
        success: false,
        error: "Password and confirm password must match",
      });
  //hashing the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);


  try {
    //creating new user
    user = new Users({
       
        email,
        password: hashedPassword,
    });
    await user.save();
    //generating and sending jwt token
    const token = jwt.sign(email, process.env.JWT_SECRET_KEY);
    res.status(200).json({ success: true ,token,user:email});
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, error });
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await Users.findOne({ email });
    // checking if user exist
    if (!user) {
      return res.status(400).send({ success: false, error: "user not found" });
    }
    // cheking if password is correct
    if (await bcrypt.compare(password, user.password)) {
      //generating and sending jwt token
      const token = jwt.sign(email, process.env.JWT_SECRET_KEY);
      res.status(200).send({ success: true, token ,user:email});
    } else {
      return res
        .status(400)
        .send({ success: false, error: "invalid credintial" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, error });
  }
};
