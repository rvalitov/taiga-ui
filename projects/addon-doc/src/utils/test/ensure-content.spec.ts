import {TuiDocCodeProcessedValue, TuiDocExampleProcessed} from '@taiga-ui/addon-doc';
import {ensureCodeProcessedValue} from '../ensure-code-processed-value';
import {ensureProcessedContent} from '../ensure-processed-content';

describe('Ensure content utils', () => {
    it('ensureProcessedContent', async () => {
        const result: TuiDocExampleProcessed = await ensureProcessedContent({
            TypeScript: 'Hello',
            HTML: Promise.resolve({default: 'World'}),
        });

        expect(result).toEqual({
            TypeScript: 'Hello',
            HTML: 'World',
        });
    });

    it('ensureCodeProcessedValue', async () => {
        let result: TuiDocCodeProcessedValue = await ensureCodeProcessedValue('Hello');

        expect(result).toBe('Hello');

        result = await ensureCodeProcessedValue(Promise.resolve({default: 'World'}));
        expect(result).toBe('World');
    });
});
