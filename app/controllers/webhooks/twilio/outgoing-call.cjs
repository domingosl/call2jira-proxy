const twilio = require('twilio');

const VoiceResponse = twilio.twiml.VoiceResponse;

const jwt = require("jsonwebtoken");

module.exports = async ({req, res, body, resolve, forbidden, logger}) => {

    const decodedSession = jwt.verify(req.query.session, process.env.JWT_SECRET, {algorithm: ['HS256']});
    logger.debug("Decoded session ok", { decodedSession })

    const callSession = jwt.sign({
        extension: decodedSession.extension,
        numberId: decodedSession.numberId,
        webhook: decodedSession.webhook,
        issueId: decodedSession.issueId,
        callerNumber: decodedSession.callerNumber,
        callerCountry: decodedSession.callerCountry
    }, process.env.JWT_SECRET, { expiresIn: 300 });

    logger.debug("New call session for voice registration ready", callSession)

    const twiml = new VoiceResponse();
    twiml.say({
        language: "en-UK",
        voice: "Google.en-GB-Standard-A"
    }, decodedSession.message);

    twiml.record({
        action: "/webhooks/twilio/voice-recording?session=" + callSession,
        method: "POST",
        maxLength: 120,
        playBeep: true
    })

    res.type('text/xml');
    res.send(twiml.toString())


}