import {TuiDocCodeProcessedValue} from '@taiga-ui/addon-doc';

export class TsFileParser {
    get className(): string {
        const [, className] =
            this.rawFileContent?.match(/(?:export class\s)(\w*)/i) ?? [];

        return className ?? '';
    }

    set className(newClassName: string) {
        this.rawFileContent = this.rawFileContent?.replace(
            /(export class\s)(\w*)/i,
            '$1' + newClassName,
        );
    }

    get hasNgModule(): boolean {
        return this.rawFileContent?.includes('@NgModule') ?? false;
    }

    get hasNgComponent(): boolean {
        return this.rawFileContent?.includes('@Component') ?? false;
    }

    constructor(protected rawFileContent: TuiDocCodeProcessedValue) {
        const classesInside = rawFileContent?.match(/export class/gi) ?? [];

        if (classesInside.length > 1) {
            throw new Error('TsFileParser: 1 component/module per ts-file');
        }
    }

    addImport(entity: TuiDocCodeProcessedValue, packageOrPath: string): void {
        const fromName = packageOrPath.replace('.ts', '');

        this.rawFileContent = this.rawFileContent?.includes(fromName)
            ? this.addIntoExistingImport(entity, fromName)
            : `import {${entity}} from '${fromName}';\n${this.rawFileContent};`;
    }

    toString(): string {
        return this.rawFileContent ?? '';
    }

    private addIntoExistingImport(
        entity: TuiDocCodeProcessedValue,
        packageName: string,
    ): string {
        const packageImportsRegex = new RegExp(
            `(?:import\\s?\\{\\r?\\n?)(?:(?:.*),\\r?\\n?)*?(?:.*?)\\r?\\n?} from (?:'|")${packageName}(?:'|");`,
            'gm',
        );

        return (
            this.rawFileContent?.replace(packageImportsRegex, parsed =>
                parsed.replace('{', `{${entity}, `),
            ) ?? ''
        );
    }
}
