import mongoose from 'mongoose';

const ExtensionSchema = mongoose.Schema({
    to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Number'
    },
    number: {
        type: String
    },
    webhook: {
        type: String
    },
    inUse: {
        type: Boolean,
        default: false
    }
}, { collection: 'extensions', timestamps: true });

ExtensionSchema.index({ to: 1, inUse: 1 });

export default mongoose.model('Extension', ExtensionSchema);