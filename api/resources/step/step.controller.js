import Step from './step.model';
import mongoose from 'mongoose';

const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {
    // Create a step
    async createStep(req, res) {
        console.log("Creating step: \n" + req.body.description);

        try {

            const foundStep = await Step.findOne({ _id: req.body.id }); //, module: req.body.module});
            if (!foundStep) {

                const step = await Step.create(req.body);
                return res.send({ message: SUCCESS, data: step });
            } else {
                return res.send({ message: EXISTS });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    // Get all steps
    async findSteps(req, res) {

        try {

            const steps = await Step.find();
            return res.send({ message: SUCCESS, data: steps });
        } catch (error) {
            return res.status(500).send(error);
        }
    },

    // Find step by number 
    async findStep(req, res) {
        let objects = "";
        Object.keys(req.query).forEach(key => {
            objects += key + ": " + req.query[key] + "\n";
        })
        // console.log("Finding steps: " + objects);

        try {

            let filter = {};

            //define search keys
            const id = req.query.id ? req.query.id : undefined;
            const number = req.query.number ? req.query.number : undefined;
            const description = req.query.description ? new RegExp(req.query.description, 'i') : undefined;
            const module = req.query.module ? req.query.module : undefined;

            if (id !== undefined) {
                filter._id = id;
            }
            if (number !== undefined) {
                filter.number = number;
            }
            if (description !== undefined) {
                filter.description = description;
            }
            if (module !== undefined) {
                filter.module = module;
            }

            const foundStep = await Step.find(filter);

            if (foundStep.length > 0) {
                return res.send({ message: SUCCESS, data: foundStep });
            } else {
                return res.send({ message: NOT_FOUND });
            }
        } catch (error) {

            return res.status(500).send(error);
        }
    },

    // Update step
    async updateStep(req, res) {
        console.log("Updating step: " + req.query.id);

        try {

            let step = {
                _id: mongoose.Types.ObjectId(req.body.id),
                number: req.body.number,
                description: req.body.description,
                image: req.body.image,
                previousStep: req.body.previousStep,
                nextStep: req.body.nextStep,
                module: req.body.module
            };
            const updatedStep = await Step.findOneAndUpdate({ id: req.body.id }, step, { new: true });
            if (updatedStep) {

                return res.send({ message: SUCCESS, data: updatedStep });
            } else {

                return res.send({ message: FAILED });
            }
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    // Delete user by Id
    async deleteStep(req, res) {
        console.log("Deleteing step: " + req.query.id);
        try {
            const id = mongoose.Types.ObjectId(req.query.id);
            console.log(id);
            const deletedStep = await Step.findByIdAndRemove(id);
            if (deletedStep) {

                return res.send({ message: SUCCESS });
            } else {

                return res.send({ message: FAILED });
            }

        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}