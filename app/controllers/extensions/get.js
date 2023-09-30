import mongoose from 'mongoose';
import { isValidHttpUrl } from '../../services/http-utils.js';
const Extensions = mongoose.model('Extension');

export default async ({body, resolve, forbidden }) => {

    if(!mongoose.Types.ObjectId.isValid(body.numberId + ""))
        return forbidden("Invalid phone number id");

    if(!isValidHttpUrl(body.webhook))
        return forbidden("Invalid webhook");

    if(await Extensions.countDocuments({ to: body.numberId, inUse: false }) === 0)
        return forbidden("The selected number has no extensions available, please try another number.");

    const extension = await Extensions.findOneAndUpdate({
        to: body.numberId,
        inUse: false,
        number: body.extension
    }, {
        webhook: body.webhook,
        inUse: true
    }, { new: true })

    resolve(extension);


}