class Log {
    d(message){
        console.log(`${this._getDateTime()} ${message}`);
    }

    e(message){
        console.error(`${this._getDateTime()} ${message}`);
    }

    _getDateTime(){
        let now = new Date();
        return `${now.getDate()}.${now.getMonth()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    }
}

const log = module.exports = new Log();