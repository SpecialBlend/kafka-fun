const kafkaPipe = require('./dist');
const legacy = require('kafka-node');
module.exports = Object.assign({}, legacy, kafkaPipe);
