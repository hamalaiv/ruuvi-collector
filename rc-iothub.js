const log = require("./log.js");
const clientFromConnectionString = require('azure-iot-device-http').clientFromConnectionString;
const Message = require('azure-iot-device').Message;

class RCIotHub{
    
    constructor(){
        this._connectionStrings = {
            "simulator001": process.env.CONNECTION_STRING_SIMULATOR001
        };
    }

    sendData(data){
        return new Promise(resolve => {
            let connectionString = this._connectionStrings[data.id];
            if(typeof(connectionString) === "undefined"){
                log.e(`Error getting connection string [${data.id}]`);
                return;
            }

            var client = clientFromConnectionString(connectionString);
            let message = new Message(JSON.stringify(data));
            client.sendEvent(message, (err, res) => {
                if(err){
                    log.e(`Error sending iothub event: ${err}`);
                    resolve(false);
                    return;
                }
                
                if(res){
                    log.d(`iothub sendEvent status: ${res.statusCode} ${res.statusMessage}`);
                    resolve(true);
                }
            });
        });
    }
}

const rciothub = module.exports = new RCIotHub();