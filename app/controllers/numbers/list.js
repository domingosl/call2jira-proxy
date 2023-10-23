import mongoose from 'mongoose';

const Numbers = mongoose.model('Number');

export default async ({req, resolve}) => {

    const query = { status: true };
    req.query.country && (query['location.country'] = req.query.country.toLowerCase());
    req.query.place && (query['location.place'] = req.query.place.toLowerCase());

    const numbers = await Numbers.find(query);

    resolve(numbers);


}