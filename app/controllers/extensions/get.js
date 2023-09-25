import mongoose from 'mongoose';

const Extensions = mongoose.model('Extension');

function isValidHttpUrl(string) {
    let url;

    try {
        url = new URL(string);
    } catch (_) {
        return false;
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default async ({body, resolve, forbidden }) => {

    if(!mongoose.Types.ObjectId.isValid(body.numberId + ""))
        return forbidden("Invalid phone number id");

    if(!isValidHttpUrl(body.webhook))
        return forbidden("Invalid webhook");

    if(await Extensions.countDocuments({ to: body.numberId, inUse: false }) === 0)
        return forbidden("The selected number has no extensions available, please try another number.");

    const extension = await Extensions.findOneAndUpdate({
        to: body.numberId,
        inUse: false
    }, {
        webhook: body.webhook,
        inUse: true
    }, { new: true })

    resolve(extension);


}