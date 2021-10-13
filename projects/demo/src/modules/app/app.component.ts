import {ChangeDetectorRef, Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {LOCAL_STORAGE, LOCATION} from '@ng-web-apis/common';
import {TUI_IS_ANDROID, TUI_IS_IOS, tuiPure, watch} from '@taiga-ui/cdk';
import {VERSION} from '@taiga-ui/core';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {changeDetection} from '../../change-detection-strategy';

// @dynamic
@Component({
    selector: 'app',
    templateUrl: 'app.template.html',
    styleUrls: ['app.style.less'],
    changeDetection,
})
export class AppComponent {
    landing = false;

    readonly version = VERSION;

    constructor(
        @Inject(TUI_IS_ANDROID) readonly isAndroid: boolean,
        @Inject(TUI_IS_IOS) readonly isIos: boolean,
        @Inject(LOCATION) private readonly locationRef: Location,
        @Inject(Router) router: Router,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(LOCAL_STORAGE) localStorage: Storage,
    ) {
        router.events
            .pipe(
                map(() => router.routerState.snapshot.url === '/'),
                distinctUntilChanged(),
                watch(changeDetectorRef),
            )
            .subscribe(landing => {
                this.landing = landing;
            });

        const env = localStorage.getItem('env');

        if (env) {
            localStorage.removeItem('env');
            router.navigateByUrl(env.replace(/\/[A-z0-9]*\//, ''));
        }
    }

    get nextDemoAppHref(): string {
        const {origin, pathname} = this.locationRef;

        return origin + '/next' + pathname;
    }

    @tuiPure
    get isChristmas(): boolean {
        const today = new Date();

        return (
            (!today.getMonth() && today.getDate() < 14) ||
            (today.getMonth() === 11 && today.getDate() > 25)
        );
    }
}
