const moment = require("moment");

class Log {
    d(message){
        console.log(`${this._getDateTime()} ${message}`);
    }

    e(message){
        console.error(`${this._getDateTime()} ${message}`);
    }

    _getDateTime(){
        return moment().format("DD.MM HH:mm:ss");
    }
}

const log = module.exports = new Log();