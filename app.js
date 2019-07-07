const os = require("os");

// simulate ruuvi tags on windows machines
const ruuvi = os.type() == "Windows_NT" ? 
                require("./ruuvi-simulator.js") :
                require("node-ruuvitag");

const rcfs = require("./rc-fs.js");

ruuvi.on('found', tag => {
    console.log('Found RuuviTag, id: ' + tag.id);
    tag.on('updated', data => {
        let now = new Date().toISOString();

        // add more fields to data object
        data.id = tag.id;
        data.timestamp = now;
        
        // log to console
        // console.log(JSON.stringify(data, null, '\t'));
        console.log(JSON.stringify(data, null, " "));
        
        // store to file
        rcfs.store(data, now);
  });
});
