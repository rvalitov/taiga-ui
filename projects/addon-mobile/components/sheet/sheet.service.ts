import {Inject, Injectable} from '@angular/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {BehaviorSubject, Observable} from 'rxjs';
import {TuiSheet} from './sheet';
import {TUI_SHEET_OPTIONS, TuiSheetOptions} from './sheet-options';

@Injectable({
    providedIn: 'root',
})
export class TuiSheetService {
    readonly sheets$ = new BehaviorSubject<TuiSheet<any, any>[]>([]);

    constructor(@Inject(TUI_SHEET_OPTIONS) private readonly options: TuiSheetOptions) {}

    open<G>(
        content: PolymorpheusContent<TuiSheetOptions>,
        options: Partial<TuiSheetOptions> = {},
    ): Observable<G> {
        return new Observable($implicit => {
            const completeWith = (result: G) => {
                $implicit.next(result);
                $implicit.complete();
            };
            const sheet = {
                ...this.options,
                ...options,
                content,
                completeWith,
                $implicit,
            };

            this.sheets$.next([...this.sheets$.value, sheet]);

            return () => {
                this.sheets$.next(this.sheets$.value.filter(item => item !== sheet));
            };
        });
    }
}
