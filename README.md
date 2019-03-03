# kafka-pipe

A functional/fluent utility for kafka, built on top of `kafka-node`.

## Install

```
npm install @specialblend/kafka-pipe
```

## Features

### PipeConsumer

#### summary

class that extends kafka Consumer and adds a fluent `.pipe()` method

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

### createSender

#### summary

higher order function that returns a curried `Producer.send` function which, when called, sends the given payload to the previously set topic

#### example

```
import { Client, createSender } from 'kafka-pipe'

const kafkaHost = 'example.com:9092'
const topic = 'test.topic'
const client = new Client({ kafkaHost })
const message = 'hello, world'
const sendToTestTopic = createSender(client, topic)

sendToTestTopic([message])

```

### createTransformer

#### summary

function that returns a `PipeConsumer`, which pipes messages from `sourceTopic`, thru provided `transform` function, then into `destinationTopic`

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
