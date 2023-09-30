import mongoose from 'mongoose';
import { isValidHttpUrl } from '../../services/http-utils.js';
const Extensions = mongoose.model('Extension');

export default async ({body, resolve, forbidden, logger }) => {

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

    logger.info("New extension activated", { phoneId: extension.to, extension: extension.number, webhook: extension.webhook });

    resolve(extension);


}