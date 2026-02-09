import express from 'express';
import {markCell,getGridData} from '../controllers/Grid.js'
import { get } from 'http';
import { authenticate } from '../middleware/auth.js';
const Router=express.Router();
Router.use(authenticate);
Router.post('/markCell',markCell);
Router.get('/getGridData',getGridData);
export default Router;