import mongoose from 'mongoose';

const { Schema } = mongoose;

const stepSchema = new Schema({
    number: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: { //encoded in base64
        type: String
    },
    previousStep: { //id
        type: String
    },
    nextStep: { //id
        type: String
    },
    module: { //id
        type: String
    }
});

export default mongoose.model('Step', stepSchema);