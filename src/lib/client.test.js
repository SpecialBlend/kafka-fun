import { KafkaClient } from 'kafka-node';
import { Client } from './client';
import { __construct__ } from '../../__mocks__/support';

test('is a function', () => {
    expect(Client).toBeFunction();
});

describe('works as expected', () => {
    const kafkaHost = 'kafka.example.com:9092';
    const kafkaOptions = {
        testOption: 'foo',
    };
    beforeAll(() => {
        jest.fn(new Client(kafkaHost, kafkaOptions));
    });
    test('calls KafkaClient with expected data', () => {
        expect(KafkaClient.prototype[__construct__]).toHaveBeenCalledWith({ kafkaHost, ...kafkaOptions });
    });
});
