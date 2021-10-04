import {TuiDocCodeProcessedValue} from '@taiga-ui/addon-doc';
import {TsFileParser} from './ts-file.parser';

export class TsFileModuleParser extends TsFileParser {
    addDeclaration(entity: TuiDocCodeProcessedValue): void {
        this.rawFileContent = this.rawFileContent?.replace(
            'declarations: [',
            `declarations: [${entity}, `,
        );
    }

    addModuleImport(entity: TuiDocCodeProcessedValue): void {
        this.rawFileContent = this.rawFileContent?.replace(
            'imports: [',
            `imports: [\n${entity}, `,
        );
    }

    hasDeclarationEntity(entity: TuiDocCodeProcessedValue): boolean {
        const [, declarations = ''] =
            this.rawFileContent?.match(/(?:declarations:\s\[)(.*)(?:\])/i) ?? [];

        return declarations.includes(entity as string);
    }
}
