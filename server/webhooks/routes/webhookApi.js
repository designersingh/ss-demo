/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const EventController = require('../../shared/controllers/EventController');
const bodyParser = require('body-parser');

module.exports = function(app, express){
    const api = express.Router();
    
    api.post('/stripe', bodyParser.raw({type: "*/*"}), EventController.listen);
    return api;
};
