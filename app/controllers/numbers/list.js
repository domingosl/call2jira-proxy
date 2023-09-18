import mongoose from 'mongoose';

const Numbers = mongoose.model('Number');

export default async ({resolve}) => {

    const numbers = await Numbers.find({});

    resolve(numbers);


}