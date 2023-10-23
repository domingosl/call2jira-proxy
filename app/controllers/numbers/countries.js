import mongoose from 'mongoose';

const Numbers = mongoose.model('Number');

export default async ({resolve}) => {

    const countries = await Numbers.aggregate([
        {
            '$match': {
                'status': true
            }
        },
        {
            '$group': {
                '_id': '$location.country',
                'flag': {
                    '$first': '$location.flag'
                }
            }
        }
    ]);

    resolve(countries);


}