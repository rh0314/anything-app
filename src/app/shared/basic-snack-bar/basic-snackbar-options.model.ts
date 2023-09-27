import { MatSnackBarConfig } from '@angular/material/snack-bar';

export interface SnackBarAction {
   text?: string;
    functionName?: string;
    function: Function;
    icon?: string;
    themeColor?: string;  // 'primary', 'accent', or 'warn'
    link?: string;
    customFunction?: string;
    functionContext: any;
}


