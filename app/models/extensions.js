import mongoose from 'mongoose';

const ExtensionSchema = mongoose.Schema({
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Number',
        required: true
    },
    number: {
        type: String,
        required: true
    },
    webhook: {
        type: String,
        required: false
    },
    inUse: {
        type: Boolean,
        default: false
    }
}, { collection: 'extensions', timestamps: true });

ExtensionSchema.index({ to: 1, inUse: 1 });

export default mongoose.model('Extension', ExtensionSchema);