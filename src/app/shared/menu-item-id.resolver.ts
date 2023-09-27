import {
    ActivatedRouteSnapshot,
    ResolveFn,
    RouterStateSnapshot,
} from '@angular/router';
import { MenuService } from '../services/menu.service';
import { inject } from '@angular/core';
export const MenuItemIdResolver: ResolveFn<any> = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
    menuService: MenuService = inject(MenuService)): string => {
        let menuItemIdSegments: string[] = [];
        route.url.forEach(u => {
            menuItemIdSegments.push(u.path)
            if (u.parameterMap.keys) {
                u.parameterMap.keys.forEach(k => menuItemIdSegments.push(u.parameterMap.get(k)));
            }
        });
        const id = menuItemIdSegments.join('-');
        menuService.currentActiveMenuId = id;
        return id;

    };