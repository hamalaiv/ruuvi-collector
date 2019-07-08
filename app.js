const os = require("os");
const moment = require("moment");
const log = require("./log.js");
const rcfs = require("./rc-fs.js");

const ruuvi = os.type() == "Windows_NT" ?
                            require("./ruuvi-simulator.js") :
                            require("node-ruuvitag");

ruuvi.on('found', tag => {
    log.d(`found [${tag.id}]`);
    tag.on('updated', async data => {
        let now = moment().toISOString();

        // add more fields to data object
        data.id = tag.id;
        data.timestamp = now;

        // log to console
        log.d(`updated [${tag.id}] rssi=${data.rssi}, humd=${data.humidity.toFixed(2)}, temp=${data.temperature.toFixed(2)}, pres=${data.pressure}, accX=${data.accelerationX}, accY=${data.accelerationY}, accZ=${data.accelerationZ}, batt=${data.battery}`);

        // store to file
        await rcfs.store(data, now);

        // data processed, can exit now succesfully
        process.exit();
    });
});

async function start() {
    // wait for ruuvi-tag to be found
    await sleep(60000);

    // did not find ruuvi-tag,
    // exit with failed status
    process.exit(1);
}

function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

start();