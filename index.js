const fs = require('fs');
const axios = require('axios').default;
const { getConfig } = require('./cfgUtil');
const { getBundles } = require('./bundleUtil');

function readBundleContents(bundles) {
    return Promise.all(bundles.map(({ name, path }) => {
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve({ [name]: data.toString() });
                }
            });
        });
    }));
}

module.exports = (bundler) => {
    bundler.on('bundled', async bundle => {
        const cfg = await getConfig();
        const bundles = getBundles(bundle);
        const moduleData = await readBundleContents(bundles);
        const axiosInstance = axios.create({
            baseURL: 'https://screeps.com/api/',
            timeout: 1000,
            headers: {
                'X-Token': cfg.authToken
            }
        });
        await axiosInstance.post('/user/code', {
            branch: cfg.branch || "default",
            modules: moduleData.reduce((acc, val) => ({ ...acc, ...val }), {})
        });
    });
}