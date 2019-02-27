jest.mock('kafka-node');

const { log, error } = console;

/**
 * Mute console output while running tests,
 * unless process.env.DEBUG is set to true
 */
beforeEach(() => {
    if (process.env.DEBUG === 'true') {
        console.log = jest.fn(log);
        console.error = jest.fn(error);
    } else {
        console.log = jest.fn();
        console.error = jest.fn();
    }
});

afterAll(() => {
    console.log = log;
    console.error = error;
});
