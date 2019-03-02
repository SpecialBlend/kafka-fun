const { createConsumer, createSender, createTransformer, PipeConsumer, PipeProducer } = require('./dist');
const base = require('kafka-node');
module.exports = Object.assign({}, base, { createConsumer, createSender, createTransformer, PipeConsumer, PipeProducer });
