import express from 'express';
import { stepRouter } from './resources/step';
import { userRouter } from './resources/user';

export const restRouter = express.Router();

restRouter.use('/user', userRouter);
restRouter.use('/step', stepRouter);