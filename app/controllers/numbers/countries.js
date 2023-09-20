import mongoose from 'mongoose';

const Numbers = mongoose.model('Number');

export default async ({resolve}) => {

    const countries = await Numbers.distinct("location.country");

    resolve(countries);


}