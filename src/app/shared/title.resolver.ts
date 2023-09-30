import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { MenuService } from '../services/menu.service';
import { inject } from '@angular/core';
import { WindowRefService } from '../services/window-ref.service';

export const TitleResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  menuService: MenuService = inject(MenuService),
  windowRef: WindowRefService = inject(WindowRefService)): string => {
      let title: string = '';

      const activeMenuItem = menuService.getActiveMenuItem();
      if (activeMenuItem) {
        title = activeMenuItem.appTitle;
      }
      windowRef.title = title;
      return title;
      
    };