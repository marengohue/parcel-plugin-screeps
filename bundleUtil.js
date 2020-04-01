
const newBundle = (name, path) => ({
    name,
    path
});

const getBundles = bundle => {
    const { name: path, assets, childBundles } = bundle;
    const bundles = [];

    if (childBundles && childBundles.size) {
        childBundles.forEach(({ name: path, assets, type }) => {
            if (assets && assets.size && type !== 'map') {
            assets.forEach(({ name }) => {
                if (!bundles.find(b => b.name === name)) {
                bundles.push(newBundle(name, path))
                }
            });
            }
        });
    }

    if (path && assets) {
        if (assets && assets.size) {
            assets.forEach(({ name, type }) => {
            if (!bundles.find(b => b.name === name) && type !== 'map') {
                bundles.push(newBundle(name, path))
            }
            });
        }
    }

    return bundles;
};

module.exports = {
    getBundles
};