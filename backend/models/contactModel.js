import mongoose from 'mongoose';

const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    }
}, {
    timestamps: true
})

const contactModel = mongoose.model('Contact', contactSchema);

export default contactModel;