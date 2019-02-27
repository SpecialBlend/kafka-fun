import * as R from 'ramda';
import { KafkaClient } from 'kafka-node';
import { createConsumer, createSender, createTransformer, PipeConsumer } from './kafka-pipe';
import { __kafkaConsumerConstruct, __kafkaProducerConstruct, __kafkaProducerSend } from '../__mocks__/kafka-node';

describe('createConsumer', () => {
    __kafkaConsumerConstruct.mockReset();
    const client = new KafkaClient();
    const topic = 'test.topic';
    const offset = 13;
    const optionalTopicSettings = {
        offset,
    };
    const optionalConsumerSettings = {
        groupId: 'test.group.id',
    };
    const consumer = createConsumer(client, topic, optionalTopicSettings, optionalConsumerSettings);
    test('returns instance of PipeConsumer', () => {
        expect(consumer).toBeInstanceOf(PipeConsumer);
    });
    test('calls Consumer constructor with expected data', () => {
        expect(__kafkaConsumerConstruct).toHaveBeenCalledWith(client, [{
            topic,
            offset,
        }], optionalConsumerSettings);
    });
    test('PipeConsumer.pipe works as expected', () => {
        const callback = jest.fn();
        consumer.pipe(callback);
        consumer.emit('message', 'test.message.0');
        consumer.emit('message', 'test.message.1');
        expect(callback).toHaveBeenCalledWith('test.message.0');
        expect(callback).toHaveBeenCalledWith('test.message.1');
    });
});

describe('createSender', () => {
    const client = new KafkaClient();
    const topic = 'test.topic';
    const key = 'test.key';
    const response = 'test.response';
    const messages = ['test.message.0', 'test.message.1'];
    const optionalSendSettings = {
        key,
    };
    const optionalProducerSettings = {
        ackTimeoutMs: 500,
    };
    const sendToTopic = createSender(client, topic, optionalSendSettings, optionalProducerSettings);
    test('returns instance of Function', () => {
        expect(typeof sendToTopic).toBe('function');
    });
    test('calls Producer constructor with expected data', () => {
        expect(__kafkaProducerConstruct).toHaveBeenCalledWith(client, optionalProducerSettings);
    });
    test('resolver calls Producer.send with expected data', async() => {
        __kafkaProducerSend.mockResolvedValueOnce(response);
        const sendResponse = await sendToTopic(messages);
        expect(__kafkaProducerSend).toHaveBeenCalledWith([{
            key,
            topic,
            messages,
        }]);
        expect(sendResponse).toBe(response);
    });
});

test('createTransformer works as expected', () => {
    __kafkaConsumerConstruct.mockReset();
    __kafkaProducerConstruct.mockReset();
    __kafkaProducerSend.mockReset();
    const client = new KafkaClient();
    const sourceTopic = 'test.source.topic';
    const destinationTopic = 'test.destination.topic';
    const transformer = jest.fn(R.reverse);
    const consumer = createTransformer(client, sourceTopic, destinationTopic, transformer);
    const message = 'test.message';
    const response = 'test.response';
    expect(consumer).toBeInstanceOf(PipeConsumer);
    expect(__kafkaProducerConstruct).toHaveBeenCalledWith(client, {});
    expect(__kafkaConsumerConstruct).toHaveBeenCalledWith(client, [{ topic: sourceTopic }], {});
    __kafkaProducerSend.mockResolvedValueOnce(response);
    consumer.emit('message', message);
    expect(transformer).toHaveBeenCalledWith(message);
    expect(__kafkaProducerSend).toHaveBeenCalledWith([{
        topic: destinationTopic,
        messages: [transformer(message)],
    }]);
});
