import express from 'express';
import stepController from './step.controller';

export const stepRouter = express.Router();

stepRouter.route('/')
    .get(stepController.findStep)
    .post(stepController.createStep)
    .put(stepController.updateStep)
    .delete(stepController.deleteStep);

stepRouter.route('/all')
    .get(stepController.findSteps);