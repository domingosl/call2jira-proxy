import mongoose from 'mongoose';

const Extensions = mongoose.model('Extension');

export default async ({req, res, body, resolve, forbidden, logger}) => {

    const requestExtension = body.Digits;

    if(!requestExtension || typeof requestExtension !== 'string')
        return forbidden("Invalid request") && logger.info("Incorrect Extension number", { requestExtension });

    const extension = await Extensions.findOne({ number: requestExtension }).populate({ path: 'to', match: { identifier: body.To }});

    if(!extension || !extension.to)
        return forbidden("Invalid request") && logger.info("Either extension or number are not valid", { extension: !!extension, number: !!extension?.number });


    resolve();

}