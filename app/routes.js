import statusController from  './controllers/status.js'
import numbersListController from  './controllers/numbers/list.js';
import numbersCountriesListController from  './controllers/numbers/countries.js';
import numbersPlacesListController from  './controllers/numbers/places.js';
import extensionsGet from  './controllers/extensions/get.js';

export default apiServer => {

    apiServer.newEndpoint('status').respondsAt('/status').isGet().isPublic().setController(statusController);
    apiServer.newEndpoint('numbersList').respondsAt('/numbers').isGet().isPublic().setController(numbersListController);
    apiServer.newEndpoint('numbersCountriesList').respondsAt('/numbers/countries').isGet().isPublic().setController(numbersCountriesListController);
    apiServer.newEndpoint('numbersPlacesList').respondsAt('/numbers/countries/:country/places').isGet().isPublic().setController(numbersPlacesListController);
    apiServer.newEndpoint('extensionGet').respondsAt('/extensions').isPost().isPublic().setController(extensionsGet);


}