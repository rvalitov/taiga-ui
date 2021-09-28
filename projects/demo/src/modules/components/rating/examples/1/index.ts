import {Component} from '@angular/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-rating-example-1',
    templateUrl: './index.html',
    changeDetection,
    encapsulation,
})
export class TuiRatingExample1 {
    public one = 0;
    public two = 2;
    public three = 4;
}
