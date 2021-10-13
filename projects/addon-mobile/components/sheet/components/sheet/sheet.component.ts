import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostListener,
    Inject,
    Input,
    QueryList,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import {EMPTY_QUERY, TUI_IS_IOS, tuiPure} from '@taiga-ui/cdk';
import {tuiSlideInTop} from '@taiga-ui/core';
import {TUI_MORE_WORD} from '@taiga-ui/kit';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TuiSheet} from '../../sheet';
import {TUI_SHEET_ID} from '../sheet-heading/sheet-heading.component';
import {TUI_SHEET_PROVIDERS, TUI_SHEET_SCROLL} from './sheet.providers';

@Component({
    selector: 'tui-sheet',
    templateUrl: 'sheet.template.html',
    styleUrls: ['sheet.style.less'],
    providers: TUI_SHEET_PROVIDERS,
    animations: [tuiSlideInTop],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        role: 'dialog',
        '[attr.aria-labelledby]': 'id',
        '[class._ios]': 'isIos',
        '[$.class._stuck]': 'stuck$',
        '($.class._stuck)': 'stuck$',
    },
})
export class TuiSheetComponent<T> implements AfterViewInit {
    @Input()
    item!: TuiSheet<T>;

    id = '';

    readonly stuck$ = this.scroll$.pipe(map(y => Math.floor(y) > this.contentTop));

    @ViewChild('sheet')
    private readonly sheet?: ElementRef<HTMLElement>;

    @ViewChild('content')
    private readonly content?: ElementRef<HTMLElement>;

    @ViewChildren('stops')
    private readonly stopsRefs: QueryList<ElementRef<HTMLElement>> = EMPTY_QUERY;

    constructor(
        @Inject(TUI_SHEET_SCROLL) private readonly scroll$: Observable<number>,
        @Inject(ElementRef) private readonly elementRef: ElementRef<HTMLElement>,
        @Inject(TUI_IS_IOS) readonly isIos: boolean,
        @Inject(TUI_MORE_WORD) readonly moreWord$: Observable<string>,
    ) {}

    get stops(): readonly number[] {
        return this.getStops(this.stopsRefs);
    }

    get imageStop(): number {
        return (this.item.imageSlide && this.stops[this.stops.length - 1]) || 0;
    }

    get imageHeight(): number {
        return this.contentTop - this.sheetTop;
    }

    ngAfterViewInit() {
        const stops = [...this.stops, this.sheetTop, this.contentTop];

        this.elementRef.nativeElement.scrollTop = stops[this.item.initial];
    }

    @HostListener(TUI_SHEET_ID, ['$event.detail'])
    onId(id: string) {
        this.id = id;
    }

    scrollTo(top: number = this.sheetTop) {
        this.elementRef.nativeElement.scrollTo({top, behavior: 'smooth'});
    }

    private get contentTop(): number {
        return this.content?.nativeElement.offsetTop ?? Infinity;
    }

    private get sheetTop(): number {
        return this.sheet?.nativeElement.offsetTop ?? Infinity;
    }

    @tuiPure
    private getStops(stops: QueryList<ElementRef<HTMLElement>>): readonly number[] {
        return stops
            .toArray()
            .map(
                ({nativeElement}) => nativeElement.offsetTop + nativeElement.clientHeight,
            );
    }
}
