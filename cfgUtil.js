const path = require('path');
const fs = require('fs');
const cfgPath = path.join(process.cwd(), '.screepsrc');

function doesCfgExist() {
    return new Promise((resolve) => {
        fs.exists(cfgPath, resolve);
    });
}

function getCfgJson() {
    return new Promise((resolve, reject) => {
        fs.readFile(cfgPath, (err, data) => {
            if (err) {
                reject(err);
            } else {
                try {
                    resolve(JSON.parse(data));
                } catch (jsonErr) {
                    reject(jsonErr);
                }
            }
        });
    })
}

async function getConfig() {
    if (await doesCfgExist()) {
        return await getCfgJson();
    } else {
        throw new Error(".screepsrc not found!");
    }
}

module.exports = {
    getConfig
};