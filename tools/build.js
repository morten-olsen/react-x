const webpack = require('webpack');
const createConfig = require('./create-config');
const package = require('../package.json');

const build = (type) => new Promise((resolve, reject) => {
  const bundler = webpack(createConfig(type));
  bundler.run((err, stats) => {
    if (err) {
      reject(err);
    } else {
      console.log(stats.toString());
      resolve(stats);
    }
  })
});

const bootstrap = async () => {
  await Promise.all(package.types.map(build));
};

bootstrap()
  .then(() => console.log('done'))
  .catch((err) => console.error(err));
