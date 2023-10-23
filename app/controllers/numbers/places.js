import mongoose from 'mongoose';

const Numbers = mongoose.model('Number');

export default async ({req, resolve}) => {

    const places = await Numbers
        .find({"location.country": req.params.country, status: true })
        .distinct("location.place");

    resolve(places);

}