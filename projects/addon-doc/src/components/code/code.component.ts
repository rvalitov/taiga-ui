import {Component, HostBinding, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {TuiDocCodeProcessedValue, TuiDocCodeValue} from '../../interfaces/page';
import {ensureCodeProcessedValue} from '../../utils/ensure-code-processed-value';

@Component({
    selector: 'tui-doc-code',
    templateUrl: './code.template.html',
    styleUrls: ['./code.style.less'],
})
export class TuiDocCodeComponent {
    public readonly processor$: Subject<TuiDocCodeProcessedValue> = new Subject();

    @Input()
    filename = '';

    @Input()
    set code(code: TuiDocCodeValue) {
        ensureCodeProcessedValue(code).then((value: TuiDocCodeProcessedValue) =>
            this.processor$.next(value),
        );
    }

    @HostBinding('class._has-filename')
    get hasFilename(): boolean {
        return !!this.filename;
    }
}
