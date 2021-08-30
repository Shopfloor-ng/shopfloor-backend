import mongoose from 'mongoose';
import Step from './step.type';

const { Schema } = mongoose;

const stepSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: { //encoded in base64
        type: String,
        required: false
    },
    previousStep: {
        type: Step,
        required: false
    },
    nextStep: {
        type: Step,
        required: false
    },
    module: {
        type: Module,
        required: false
    }
});

export default mongoose.model('StepSchema', stepSchema);