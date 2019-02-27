import { KafkaClient } from 'kafka-node';
import { createConsumer, createProducer, PipeConsumer } from './kafka-pipe';

describe('createConsumer', () => {
    const client = new KafkaClient();
    const topic = 'test.topic';
    const consumer = createConsumer(client, topic);
    test('returns instance of PipeConsumer', () => {
        expect(consumer).toBeInstanceOf(PipeConsumer);
    });
    test('Calls Consumer constructor with expected data', () => {
        expect(consumer).toBeInstanceOf(PipeConsumer);
    });
});
