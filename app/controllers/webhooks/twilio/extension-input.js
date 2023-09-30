import mongoose from 'mongoose';
import axios from 'axios';

const Extensions = mongoose.model('Extension');

export default async ({req, res, body, resolve, forbidden, logger}) => {

    const requestExtension = body.Digits;

    if(!requestExtension || typeof requestExtension !== 'string')
        return forbidden("Invalid request") && logger.info("Incorrect Extension number", { requestExtension });

    const extension = await Extensions.findOne({ number: requestExtension, inUse: true }).populate({ path: 'to', match: { identifier: body.To }});

    if(!extension || !extension.to) {

        logger.info("Either extension or number are not valid", {
            extension: !!extension,
            number: !!extension?.number
        });

        const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="en-UK" voice="Polly.Amy">
    The extension number is incorrect. Please enter your 4-digit extension number.
  </Say>
  <Gather action="/webhooks/twilio/extension-input" method="POST" numDigits="4" finishOnKey="#" input="dtmf" />
</Response>`

        res.set('Content-Type', 'text/xml');
        return res.send(xmlResponse);
    }


    const response = await axios.post(extension.webhook, {
        method: 'POST',
        data: {
            cmd: 'getFlow',
            payload: {
                extension: extension.number,
                phone: extension.to.identifier
            }
        }
    });

    console.log(response.data);

    resolve();

}