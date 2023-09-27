import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { MenuService } from '../services/menu.service';
import { inject } from '@angular/core';

export const TitleResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  menuService: MenuService = inject(MenuService)): string => {
      let title: string = '';

      const activeMenuItem = menuService.getActiveMenuItem();
      if (activeMenuItem) {
        return activeMenuItem.appTitle;
      }
      
      return title;
      
    };