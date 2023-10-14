import statusController from  './controllers/status.js'
import numbersListController from  './controllers/numbers/list.js';
import numbersCountriesListController from  './controllers/numbers/countries.js';
import numbersPlacesListController from  './controllers/numbers/places.js';
import extensionsGet from  './controllers/extensions/get.js';
import extensionsFree from  './controllers/extensions/free.js';
import twilioRingWebhook from './controllers/webhooks/twilio/ring.js';
import twilioExtensionInputWebhook from './controllers/webhooks/twilio/extension-input.js';
import twilioVoiceRecordingWebhook from './controllers/webhooks/twilio/voice-recording.js';
import twilioOutgoingCallWebhook from './controllers/webhooks/twilio/outgoing-call.cjs';
import outgoingCallMake from './controllers/outgoing-call/make.cjs';

export default apiServer => {

    apiServer.newEndpoint('status').respondsAt('/status').isGet().isPublic().setController(statusController);
    apiServer.newEndpoint('numbersList').respondsAt('/numbers').isGet().isPublic().setController(numbersListController);
    apiServer.newEndpoint('numbersCountriesList').respondsAt('/numbers/countries').isGet().isPublic().setController(numbersCountriesListController);
    apiServer.newEndpoint('numbersPlacesList').respondsAt('/numbers/countries/:country/places').isGet().isPublic().setController(numbersPlacesListController);
    apiServer.newEndpoint('extensionGet').respondsAt('/extensions').isPost().isPublic().setController(extensionsGet);
    apiServer.newEndpoint('extensionFree').respondsAt('/extensions/:extension/free').isPost().isPublic().setController(extensionsFree);

    apiServer.newEndpoint('twilioRingWebhook').respondsAt('/webhooks/twilio/ring').isPost().isPublic().setController(twilioRingWebhook);
    apiServer.newEndpoint('twilioExtInoutWebhook').respondsAt('/webhooks/twilio/extension-input').isPost().isPublic().setController(twilioExtensionInputWebhook);
    apiServer.newEndpoint('twilioOutgoingCallWebhook').respondsAt('/webhooks/twilio/outgoing-call').isPost().isPublic().setController(twilioOutgoingCallWebhook);
    apiServer.newEndpoint('twilioVoiceRecordingWebhook').respondsAt('/webhooks/twilio/voice-recording').isPost().isPublic().setController(twilioVoiceRecordingWebhook);

    apiServer.newEndpoint('outgoingCallMake').respondsAt('/outgoing-call/make').isPost().isPublic().setController(outgoingCallMake);


}