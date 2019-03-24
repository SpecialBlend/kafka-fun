import { PipeConsumer } from '../src/lib/consumer';
import * as printing from '../src/lib/printer';

export function testIsPrintable(printable) {
    let printableSpy;
    let result;
    const testPrinterMessage = 'zqwesxdrcftvygbhunjimko,l';
    const printer = jest.fn();
    beforeAll(() => {
        printableSpy = jest.spyOn(printable, 'on');
        result = printable.print(printer);
        result.emit('message', testPrinterMessage);
    });
    test('exists', () => {
        expect(printable).toHaveProperty('print', expect.any(Function));
    });
    test('prototype matches Printable.print', () => {
        expect(PipeConsumer.prototype.print).toBe(printing.Printable.prototype.print);
    });
    test('is fluent', () => {
        expect(result).toBe(printable);
    });
    test('registers message handler to provided printer', () => {
        expect(printableSpy).toHaveBeenCalledWith('message', printer);
    });
    test('calls printer on message event', () => {
        expect(printer).toHaveBeenCalledWith(testPrinterMessage);
    });
}
