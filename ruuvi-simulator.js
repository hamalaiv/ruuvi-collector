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
                // TODO: emit correct data
                ruuviTag.emit("updated", "{'key':'value'}");
                this.run();
            }, 1000);
        }, 100);
    }
};

const ruuviSimulator = module.exports = new RuuviSimulator();