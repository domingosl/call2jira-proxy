import mongoose from 'mongoose';

const NumberSchema = mongoose.Schema( {
    identifier: {
        type: String,
        required: true,
        index: true
    },
    type: {
        type: String,
        enum: ['local','mobile'],
        required: true
    },
    location: {
        country: {
            type: String,
            required: true
        },
        place: {
            type: String,
            required: true
        },
        geo: {
            type: {
                type: String,
                enum: ['Point'],
                default: 'Point',
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }
    }
}, { collection: 'numbers', timestamps: true  });

export default mongoose.model('Number', NumberSchema);