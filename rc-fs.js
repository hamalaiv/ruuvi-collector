/*
 * csv file headers:
 * id;timestamp;rssi;humidity;temperature;pressure;accelerationX;accelerationY;accelerationZ;battery
 * 
*/

const fs = require("fs");
const fsPromises = fs.promises;
var path = require('path');
const log = require("./log.js");

class RCFS{
    
    constructor(){
        this.baseFolder = path.join(__dirname, "data");
    }

    async store(data){
        let folderExists = await this._ensureFolderExists();
        if(!folderExists){
            return false;
        }

        return this._writeToFile(data);
    }

    async _ensureFolderExists(){
        if(!fs.existsSync(this.baseFolder)){
            try{
                await fsPromises.mkdir(this.baseFolder);
            }
            catch(error){
                log.e(`Error RCFS._ensureFolderExists: ${error}`);
                return false;
            }
        }
        return true;
    }

    async _writeToFile(data){
        let filePath = path.join(this.baseFolder, `${data.id}.csv`);
        let entry = `${data.id};${data.timestamp};${data.rssi};${data.humidity};${data.temperature};${data.pressure};${data.accelerationX};${data.accelerationY};${data.accelerationZ};${data.battery};\n`;
        try{
            await fsPromises.appendFile(filePath, entry);
        }
        catch(error){
            log.e(`Error RCFS._writeToFile: ${error}`);
            return false;
        }

        return true;
    }
}

const rcfs = module.exports = new RCFS();