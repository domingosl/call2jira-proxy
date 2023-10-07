import mongoose from 'mongoose';
import axios from 'axios';
import jwt from 'jsonwebtoken';

import {removeSpecial} from '../../../services/http-utils.js';

const Extensions = mongoose.model('Extension');

export default async ({req, res, body, resolve, forbidden, logger}) => {

    res.set('Content-Type', 'text/xml');

    const requestExtension = body.Digits;

    if (!requestExtension || typeof requestExtension !== 'string')
        return forbidden("Invalid request") && logger.info("Incorrect Extension number", {requestExtension});

    const extension = await Extensions.findOne({number: requestExtension, inUse: true}).populate({
        path: 'to',
        match: {identifier: body.To}
    });

    if (!extension || !extension.to) {

        logger.info("Either extension or number are not valid", {
            extension: !!extension,
            number: !!extension?.number
        });

        const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="en-UK" voice="Google.en-GB-Standard-A">
    The extension number is incorrect. Please enter your 4-digit extension number.
  </Say>
  <Gather action="/webhooks/twilio/extension-input" method="POST" numDigits="4" finishOnKey="#" input="dtmf" />
</Response>`;

        return res.send(xmlResponse);
    }


    const response = await axios.post(extension.webhook, {
        cmd: 'getFlow',
        payload: {
            extension: extension.number,
            numberId: extension.to._id

        }
    });

    const callerNumber = body.Caller;
    const callerCountry = body.CallerCountry;

    const callSession = jwt.sign({
        extension: extension.number,
        numberId: extension.to._id,
        webhook: extension.webhook,
        callerNumber,
        callerCountry
    }, process.env.JWT_SECRET, { expiresIn: 300 });

    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="en-UK" voice="Google.en-GB-Standard-A">
    `+ removeSpecial(response.data.data.message) +`
  </Say>
  <Record action="/webhooks/twilio/voice-recording?session=` + callSession + `" method="POST" maxLength="120" playBeep="true"/>
</Response>`



    return res.send(xmlResponse);


}