import express from 'express';
import {signUp,signIn} from '../controllers/Auth.js'
const Router=express.Router();
Router.post('/signup',signUp);
Router.post('/signin',signIn);

export default Router;