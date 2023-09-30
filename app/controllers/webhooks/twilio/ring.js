import mongoose from 'mongoose';

const Numbers = mongoose.model('Number');

export default async ({req, res, body, resolve, forbidden, logger}) => {

    if (body.AccountSid !== process.env.TWILIO_ACCOUNT_SID)
        return forbidden("Invalid request") && logger.info("Incorrect Account SID in incomming call", { accountSid: body.AccountSid });

    const callId = body.CallSid;
    const callToNumber = body.To;
    const callerNumber = body.Caller;
    const callerCountry = body.CallerCountry;

    const registerNumber = await Numbers.findOne({identifier: callToNumber});

    if (!registerNumber)
        return forbidden("Unknown receiver number") && logger.info("Unknown receiver number", {callToNumber});


    const xmlResponse = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="en-UK" voice="Google.en-GB-Standard-A">
    Welcome!. Please enter your 4-digit extension number.
  </Say>
  <Gather action="/webhooks/twilio/extension-input" method="POST" numDigits="4" finishOnKey="#" input="dtmf" />
</Response>`

    res.set('Content-Type', 'text/xml');
    res.send(xmlResponse);


}