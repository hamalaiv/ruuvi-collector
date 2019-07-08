/*
 * csv file headers:
 * id;timestamp;rssi;humidity;temperature;pressure;accelerationX;accelerationY;accelerationZ;battery
 * 
*/

const fs = require("fs");
var path = require('path');
const log = require("./log.js");

class RCFS{
    
    constructor(){
        this.baseFolder = path.join(__dirname, "data");
    }

    store(data){
        return new Promise(async resolve => {
            let folderExists = await this._ensureFolderExists();
            if(!folderExists){
                resolve(false);
                return;
            }

            let writeSucceeded = await this._writeToFile(data);
            resolve(writeSucceeded);
        });
    }

    _ensureFolderExists(){
        return new Promise(resolve => {
            if(fs.existsSync(this.baseFolder)){
                resolve(true);
                return;
            }

            fs.mkdir(this.baseFolder, error => {
                if(error){
                    log.e(`Error RCFS._ensureFolderExists: ${error}`);
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }

    _writeToFile(data){
        return new Promise(resolve => {
            let filePath = path.join(this.baseFolder, `${data.id}.csv`);
            let entry = `${data.id};${data.timestamp};${data.rssi};${data.humidity};${data.temperature};${data.pressure};${data.accelerationX};${data.accelerationY};${data.accelerationZ};${data.battery};\n`;
            fs.appendFile(filePath, entry, error => {
                if(error){
                    log.e(`Error RCFS._writeToFile: ${error}`);
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }
}

const rcfs = module.exports = new RCFS();