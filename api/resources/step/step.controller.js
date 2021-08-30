const EXISTS = 'EXISTS';
const SUCCESS = 'SUCCESS';
const FAILED = 'FAILED';
const NOT_FOUND = 'NOT_FOUND';

export default {
    // Create a step
    async createStep(req, res) {

        try {

            const foundStep = await Step.findOne({ _id: req.body.id}); //, module: req.body.module});
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
    async findSteps (req, res) {

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

            const foundStep = await Step.findOne({ id: req.query.id });
            if (foundStep) {

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
                parentStep: req.body.parentStep,
                module: req.body.module
            };
            const updatedStep = await Step.findOneAndUpdate({ id: req.body.id }, step, { new: true });
            if (updatedStep) {

                return res.send({ message : SUCCESS, data: updatedStep });
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

                return res.send({ message : SUCCESS });
            } else {

                return res.send({ message: FAILED });
            }
            
        } catch (error) {
            
            return res.status(500).send(error);
        }
    }
}