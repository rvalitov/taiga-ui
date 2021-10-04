import {
    RawLoaderContent,
    TuiDocExample,
    TuiDocExampleProcessed,
} from '../interfaces/page';

export async function ensureProcessedContent(
    content: TuiDocExample,
): Promise<TuiDocExampleProcessed> {
    const processedContent: TuiDocExampleProcessed = {};

    for (const [key, value] of Object.entries(content)) {
        if (value instanceof Promise) {
            processedContent[key] = (await (value as RawLoaderContent)).default;
        } else {
            processedContent[key] = value;
        }
    }

    return processedContent;
}
