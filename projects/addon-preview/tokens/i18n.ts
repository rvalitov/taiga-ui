import {InjectionToken} from '@angular/core';
import {extractI18n} from '@taiga-ui/i18n';

export const TUI_PREVIEW_TOOLBAR_TEXTS = new InjectionToken(`tui-preview i18n`, {
    factory: extractI18n('previewTexts'),
});
