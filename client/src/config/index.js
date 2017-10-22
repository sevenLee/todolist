const base = require('./base')

/* eslint-disable no-console */
// console.info(`GNS_BO v${process.env.VERSION} | ${process.env.NODE_ENV}`);
console.log('App Version:', process.env.REACT_APP_VERSION)
let config;
switch(process.env.NODE_ENV) {
    case 'development':
        config = Object.assign({}, base, require('./development.js'));
        break;
    case 'production':
        config = Object.assign({}, base, require('./production.js'));
        break;
    default:
        config = Object.assign({}, base, require('./development.js'));
        break;
}
module.exports = config;
