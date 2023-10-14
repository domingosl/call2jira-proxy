const twilioClient = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_SECRET);
const jwt = require("jsonwebtoken");


module.exports = async ({resolve, body, forbidden, logger}) => {

    const issueId = body.context?.extension?.issue?.id;

    if(!issueId)
        return forbidden("Missing issue ID");

    const callSession = jwt.sign({
        message: body.message,
        extension: body.extension,
        numberId: body.number.value,
        webhook: body.webhook,
        callerNumber: body.callerNumber,
        callerCountry: body.callerCountry,
        issueId
    }, process.env.JWT_SECRET, { expiresIn: 600 });

    const url = process.env.APP_URL + '/webhooks/twilio/outgoing-call?session=' + callSession;

    logger.debug("New session URL for outgoing call configuration", { url });

    await twilioClient.calls
        .create({
            url,
            to: body.callerNumber,
            from: body.number.label
        })

    resolve();

};