# kafka-pipe

A functional/fluent utility for kafka, built on top of `kafka-node`.

## Features

### PipeConsumer

#### summary

class that extends kafka Consumer and adds a `.pipe()` method

### definition

```
/**
 * Extend Kafka Consumer class to add pipe method
 */
export class PipeConsumer extends Consumer {
    pipe(resolve) {
        this.on('message', resolve);
        return this;
    }
}
```

#### example

```
import { Client, PipeConsumer } from 'kafka-pipe'

const kafkaHost = 'example.com:9092'
const topic = 'test.topic'
const client = new Client({ kafkaHost })
const consumer = new PipeConsumer(client, [{ topic ])

consumer.pipe(console.log)

// prints 'hello, world!' to console.log
consumer.emit('message', 'hello, world!')

```

### createConsumer

#### summary

function that returns an instance of `PipeConsumer`

#### definition

```
/**
 * Create Piped Consumer
 * @param {KafkaClient} client: kafka client
 * @param {String} topic: name of topic
 * @param {Object|null} topicSettings: optional topic settings
 * @param {Object|null} options: optional consumer settings
 * @return {PipeConsumer}: PipeConsumer
 */
export const createConsumer = (client, topic, topicSettings = {}, options = {}) =>
    new PipeConsumer(client, [{ ...topicSettings, topic }], options);
```

#### example

```
import * as R from 'ramda'
import { Client, createConsumer } from 'kafka-pipe'

const printMessage = ({ topic, value }) => {
    console.log('received message')
    console.log('topic: ', topic)
    console.log('message: ', value)
}

const sendMessageToS3 = R.pipe(
    R.prop('value'),
    R.reverse,
    R.tap(message => console.log('sending message to s3', message)),
    s3Put,
)

const kafkaHost = 'example.com:9092'

const topic = 'test.topic'

const client = new Client({ kafkaHost })

const consumer = createConsumer(client, topic)

consumer
    .pipe(printMessage)
    .pipe(sendMessageToS3)

```

### createProducer

#### definition

```
/**
 * Create Piped Producer
 * @param {KafkaClient} client: kafka client
 * @param {String} topic: name of topic
 * @param {Object|null} sendSettings: optional send settings
 * @param {Object|null} options: optional producer settings
 * @return {Function}: The resulting curried send function
 */
export const createProducer = (client, topic, sendSettings = {}, options = {}) => {
    const producer = new Producer(client, options);
    const producerSend = promisify(producer.send.bind(producer));
    return messages => producerSend([{
        ...sendSettings,
        topic,
        messages,
    }]);
};
```

#### example

```
import { Client, createProducer } from 'kafka-pipe'

const kafkaHost = 'example.com:9092'
const topic = 'test.topic'
const client = new Client({ kafkaHost })
const message = 'hello, world'
const sendToTestTopic = createProducer(client, topic)

sendToTestTopic([message])

```

### createTransformer

#### summary

function that returns a `PipeConsumer`, which pipes messages from `sourceTopic`, thru provided `transformer` function, then into `destinationTopic`

#### definition

```
/**
 * Create Transformer that reads from sourceTopic, transforms data then pipes to destinationTopic
 * @param {KafkaClient} client: kafka client
 * @param {String} sourceTopic: source kafka topic name
 * @param {String} destinationTopic: destination kafka topic name
 * @param {Function} transform: transformer function
 * @return {PipeConsumer}: PipeConsumer
 */
export const createTransformer = (client, sourceTopic, destinationTopic, transform) => {
    const sendToDestination = createProducer(client, destinationTopic);
    const consumer = createConsumer(client, sourceTopic);
    consumer.pipe(message => sendToDestination([transform(message)]));
    return consumer;
};

```

#### example

```
import { Client, createTransformer } from 'kafka-pipe'

const normalizeMessage = () => {
    // normalize message before forwarding ...
}

const kafkaHost = 'example.com:9092'
const sourceTopic = 'test.source.topic'
const destinationTopic = 'test.destination.topic'
const client = new Client({ kafkaHost })
const consumer = createTransformer(client, sourceTopic, destinationTopic, normalizeMessage) 

```
