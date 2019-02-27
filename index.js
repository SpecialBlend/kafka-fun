const kafkaPipe = require('./dist');
const base = require('kafka-node');
module.exports = Object.assign({}, base, kafkaPipe);
