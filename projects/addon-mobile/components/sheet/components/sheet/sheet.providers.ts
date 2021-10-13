import {DOCUMENT} from '@angular/common';
import {ElementRef, InjectionToken, NgZone, Provider} from '@angular/core';
import {TUI_IS_IOS, tuiZonefree, typedFromEvent} from '@taiga-ui/cdk';
import {merge, Observable} from 'rxjs';
import {map, mapTo, share} from 'rxjs/operators';
import {isoScrollFactory} from '../../ios.hacks';

export const TUI_SHEET_SCROLL = new InjectionToken<number>(
    'Current scrollTop of a sheet',
);

export const TUI_SHEET_DRAGGED = new InjectionToken<boolean>(
    'The sheet is being dragged',
);

export const TUI_SHEET_PROVIDERS: Provider[] = [
    {
        provide: TUI_SHEET_DRAGGED,
        deps: [ElementRef],
        useFactory: sheetDraggedFactory,
    },
    {
        provide: TUI_SHEET_SCROLL,
        deps: [ElementRef, NgZone, DOCUMENT, TUI_IS_IOS],
        useFactory: sheetScrollFactory,
    },
];

export function sheetDraggedFactory({
    nativeElement,
}: ElementRef<HTMLElement>): Observable<boolean> {
    return merge(
        typedFromEvent(nativeElement, 'touchstart', {passive: true}).pipe(mapTo(true)),
        typedFromEvent(nativeElement, 'touchend').pipe(mapTo(false)),
    );
}

export function sheetScrollFactory(
    {nativeElement}: ElementRef<HTMLElement>,
    ngZone: NgZone,
    documentRef: Document,
    isIos: boolean,
): Observable<number> {
    return isIos
        ? isoScrollFactory(nativeElement, documentRef, ngZone)
        : merge(
              typedFromEvent(nativeElement, 'scroll'),
              typedFromEvent(nativeElement, 'load', {capture: true}),
          ).pipe(
              map(() => nativeElement.scrollTop),
              tuiZonefree(ngZone),
              share(),
          );
}
