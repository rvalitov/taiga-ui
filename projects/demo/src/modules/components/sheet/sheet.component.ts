import {Component, Inject, ViewChild} from '@angular/core';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as example3Html} from '!!raw-loader!./examples/3/index.html';
import {default as example3Less} from '!!raw-loader!./examples/3/index.less';
import {default as example3Ts} from '!!raw-loader!./examples/3/index.ts';
import {TUI_SHEET_DEFAULT_OPTIONS, TuiSheetOptions} from '@taiga-ui/addon-mobile';
import {TUI_IS_MOBILE} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

// @dynamic
@Component({
    selector: 'example-sheet',
    templateUrl: './sheet.template.html',
    styleUrls: ['./sheet.style.less'],
    changeDetection,
})
export class ExampleTuiSheetComponent {
    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        HTML: example1Html,
    };

    readonly example2: FrontEndExample = {
        TypeScript: example2Ts,
        HTML: example2Html,
    };

    readonly example3: FrontEndExample = {
        TypeScript: example3Ts,
        HTML: example3Html,
        LESS: example3Less,
    };

    readonly exampleImportModule = exampleImportModule;

    readonly exampleInsertTemplate = exampleInsertTemplate;

    closeable = TUI_SHEET_DEFAULT_OPTIONS.closeable;
    image = TUI_SHEET_DEFAULT_OPTIONS.image;
    imageSlide = TUI_SHEET_DEFAULT_OPTIONS.imageSlide;
    initial = TUI_SHEET_DEFAULT_OPTIONS.initial;
    overlay = TUI_SHEET_DEFAULT_OPTIONS.overlay;
    stops = TUI_SHEET_DEFAULT_OPTIONS.stops;

    open = false;

    readonly imageVariants = [this.image, '/assets/images/avatar.jpg', 'Template'];

    readonly stopsVariants = [this.stops, ['100px'], ['10rem', '20rem']];

    @ViewChild('template')
    readonly templateRef: PolymorpheusContent<TuiSheetOptions> = '';

    constructor(@Inject(TUI_IS_MOBILE) readonly isMobile: boolean) {}

    get computedImage(): PolymorpheusContent<TuiSheetOptions> {
        return this.image === 'Template' ? this.templateRef : this.image;
    }

    get options(): Partial<TuiSheetOptions> {
        return {
            closeable: this.closeable,
            image: this.computedImage,
            imageSlide: this.imageSlide,
            stops: this.stops,
            initial: this.initial,
            overlay: this.overlay,
        };
    }

    toggle() {
        this.open = !this.open;
    }
}
