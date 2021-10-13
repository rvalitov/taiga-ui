import {NgZone} from '@angular/core';
import {tuiZonefree, typedFromEvent} from '@taiga-ui/cdk';
import {concat, merge, Observable, race, timer, zip} from 'rxjs';
import {
    debounceTime,
    filter,
    map,
    mapTo,
    share,
    startWith,
    switchMap,
    switchMapTo,
    take,
    takeUntil,
} from 'rxjs/operators';

export function isoScrollFactory(
    element: HTMLElement,
    documentRef: Document,
    ngZone: NgZone,
): Observable<number> {
    const load$ = typedFromEvent(element, 'load', {capture: true});
    const touchstart$ = typedFromEvent(element, 'touchstart', {passive: true});
    const touchmove$ = typedFromEvent(documentRef, 'touchmove', {passive: true});
    const touchend$ = typedFromEvent(documentRef, 'touchend');
    const scroll$ = typedFromEvent(element, 'scroll').pipe(map(() => element.scrollTop));
    const result$ = merge(
        load$.pipe(map(() => element.scrollTop)),
        touchstart$.pipe(
            switchMap(({touches}) => {
                const {screenY} = touches[0];
                const {scrollTop} = element;

                return concat(
                    // Sometimes touch is triggered without scroll in iOS, filter that
                    zip(touchmove$, scroll$).pipe(
                        map(([{touches}]) => scrollTop + screenY - touches[0].screenY),
                        takeUntil(touchend$),
                    ),
                    scroll$,
                );
            }),
        ),
    );

    return concat(scroll$.pipe(take(1)), result$).pipe(tuiZonefree(ngZone), share());
}

export function processDragged(
    dragged$: Observable<boolean>,
    scroll$: Observable<unknown>,
): Observable<boolean> {
    const touchstart$ = dragged$.pipe(filter(Boolean));
    const touchend$ = dragged$.pipe(filter(v => !v));

    return merge(
        touchstart$.pipe(mapTo(true)),
        touchend$.pipe(
            switchMapTo(
                race(scroll$, timer(100)).pipe(debounceTime(200), take(1), mapTo(false)),
            ),
        ),
    ).pipe(startWith(false));
}
