export interface TuiDocPageBase {
    readonly section?: string;
    readonly title: string;
}

export interface TuiDocPage extends TuiDocPageBase {
    readonly route: string;
    readonly keywords?: string;
}

export interface TuiDocPageGroup extends TuiDocPageBase {
    readonly subPages: ReadonlyArray<TuiDocPage>;
}

export const EXAMPLE_PRIMARY_FILE_NAME = {
    TS: 'TypeScript',
    LESS: 'LESS',
    HTML: 'HTML',
} as const;

export type RawLoaderContent = Promise<{default: string}>;

export type TuiDocCodeValue = RawLoaderContent | string | null | undefined;

export type TuiDocCodeProcessedValue = string | null | undefined;

export interface TuiDocExample extends Record<string, TuiDocCodeValue> {
    [EXAMPLE_PRIMARY_FILE_NAME.TS]?: TuiDocCodeValue;
    [EXAMPLE_PRIMARY_FILE_NAME.HTML]?: TuiDocCodeValue;
    [EXAMPLE_PRIMARY_FILE_NAME.LESS]?: TuiDocCodeValue;
}

export type TuiDocExampleProcessed = Record<string, TuiDocCodeProcessedValue>;
