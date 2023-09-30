import mongoose from 'mongoose';
const Extensions = mongoose.model('Extension');

export default async ({body, req, resolve, forbidden }) => {

    //TODO: Check auth

    if(!mongoose.Types.ObjectId.isValid(body.numberId + ""))
        return forbidden("Invalid phone number id");

    console.log({        to: body.numberId,
        number: req.params.extension,
        inUse: true});
    await Extensions.findOneAndUpdate({
        to: body.numberId,
        number: req.params.extension,
        inUse: true
    }, {
        to: null,
        inUse: false,
        webhook: null
    })

    resolve();


}