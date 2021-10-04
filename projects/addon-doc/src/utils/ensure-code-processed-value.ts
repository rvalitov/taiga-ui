import {
    RawLoaderContent,
    TuiDocCodeProcessedValue,
    TuiDocCodeValue,
} from '../interfaces/page';

export async function ensureCodeProcessedValue(
    code: TuiDocCodeValue,
): Promise<TuiDocCodeProcessedValue> {
    return code instanceof Promise ? (await (code as RawLoaderContent)).default : code;
}
