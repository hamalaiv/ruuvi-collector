const EventEmitter = require('events').EventEmitter;

class RuuviTag extends EventEmitter {

    constructor(data) {
      super();
      this.id = data.id;
    }
}

class RuuviSimulator extends EventEmitter {

    constructor(){
        super();
        this.ruuviTag = new RuuviTag({
            id: "simulator",
        });
        this._start();
    }

    _start(){
        setTimeout(() => {
            this.emit("found", this.ruuviTag);
            this._updateLoop();
        }, 100);
    }

    _updateLoop(){
        setTimeout(() => {
            this.ruuviTag.emit("updated", this._generateData(3));
            this._updateLoop();
        }, 1000);
    }

    _generateData(dataFormat){
        return {
            "dataFormat": dataFormat,
            "rssi": -70 + this._randomInt(10),
            "humidity": 40 + this._random(10),
            "temperature": 18 + this._random(7),
            "pressure": 99400 + this._randomInt(100),
            "accelerationX": -1000 + this._randomInt(100),
            "accelerationY": -50 + this._randomInt(100),
            "accelerationZ": 900 + this._randomInt(100),
            "battery": 3000 + this._randomInt(200)
        }
    }

    _random(max){
        return Math.random() * max;
    }

    _randomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }
};

const ruuviSimulator = module.exports = new RuuviSimulator();