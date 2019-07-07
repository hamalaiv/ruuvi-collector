const os = require("os");

// simulate ruuvi tags on windows machines
const ruuvi = os.type() == "Windows_NT" ? 
                require("./ruuvi-simulator.js") :
                require("node-ruuvitag");

ruuvi.on('found', tag => {
  console.log('Found RuuviTag, id: ' + tag.id);
  tag.on('updated', data => {
    console.log('Got data from RuuviTag ' + tag.id + ':\n' +
      JSON.stringify(data, null, '\t'));
  });
});
