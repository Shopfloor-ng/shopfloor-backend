import Step from './step.model'

const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {
    // Create a step
    async createStep(req, res) {

        try {

            const foundStep = await Step.findOne({ _id: req.body.id }); //, module: req.body.module});
            if (!foundStep) {

                const step = await Step.create(req.body);
                return res.send({ message: SUCCESS, data: step });
            } else {
                return res.send({ message: EXISTS });
            }
        } catch (error) {
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

    // Find step by number & 
    async findStep(req, res) {

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
            if (module !== undefined){
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

        try {

            let step = {
                id: req.body.id,
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

            return res.status(500).send(error);
        }
    },

    // Delete user by Id
    async deleteStep(req, res) {

        try {

            const deletedStep = await Step.findByIdAndRemove(req.query.id)
            if (deletedStep) {

                return res.send({ message: SUCCESS });
            } else {

                return res.send({ message: FAILED });
            }

        } catch (error) {

            return res.status(500).send(error);
        }
    }
}