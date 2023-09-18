import 'dotenv/config'
import LuminaJS from 'luminajs';
import './app/services/db.js';

const apiServer = new LuminaJS({
    port: process.env.PORT
});

import "./app/models.js";
import routes from "./app/routes.js";


routes(apiServer);