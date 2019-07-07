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
        this.run();
    }

    run(){
        let ruuviTag = new RuuviTag({
            id: "simulator",
        });

        setTimeout(() => {
            this.emit("found", ruuviTag);
            setTimeout(() => {
                ruuviTag.emit("updated", this.generateData(3));
                this.run();
            }, 1000);
        }, 100);
    }

    generateData(dataFormat){
        return {
            "dataFormat": dataFormat,
            "rssi": -70 + this.randomInt(10),
            "humidity": 40 + this.random(10),
            "temperature": 18 + this.random(7),
            "pressure": 99400 + this.randomInt(100),
            "accelerationX": -1000 + this.randomInt(100),
            "accelerationY": -50 + this.randomInt(100),
            "accelerationZ": 900 + this.randomInt(100),
            "battery": 3000 + this.randomInt(200)
        }
    }

    random(max){
        return Math.random() * max;
    }

    randomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }
};

const ruuviSimulator = module.exports = new RuuviSimulator();