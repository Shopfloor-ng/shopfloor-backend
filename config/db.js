import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default {

    connect() {
        mongoose.connect('mongodb://localhost:27017/', { useNewUrlParser: true });
    }
}