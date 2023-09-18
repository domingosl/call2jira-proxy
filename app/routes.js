import statusController from  './controllers/status.js'
import numbersListController from  './controllers/numbers/list.js';

export default apiServer => {

    apiServer.newEndpoint('status').respondsAt('/status').isGet().isPublic().setController(statusController);
    apiServer.newEndpoint('numbersList').respondsAt('/numbers').isGet().isPublic().setController(numbersListController);


}