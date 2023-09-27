export enum MenuItemType {
  DIVIDER,
  SUBHEADER,
  SELECTABLE_OPTION,
  DEVICE_INFO
}

export class MenuOption {
    id: number;
    title?: string;
    appTitle?: string;
    mobile?: boolean;
    path?: string;
    function?: string;
    activeIdPattern?: string;
    divider?: boolean;
    subheader?: boolean;
    authRequired?: boolean;
    type?: MenuItemType
    children?: MenuOption[];
    childMenuOpen?: boolean;

    constructor() {}


    // TODO:  DO THIS ANOTHER WAY... ANY OTHER WAY!!
    isActive(currentActiveId: string): boolean {
      if (!this.activeIdPattern) { return false; }
      const re = new RegExp(`^${this.activeIdPattern}$`);
      if (currentActiveId.match(re)) {
        return true;
      }
      return false;
    }
}

export interface FormGroupMenuOption {
  id: number;
  title?: string;
  appTitle?: string;
  path?: string;
  function?: string;
  activeIdPattern?: string;
  divider?: boolean;
  subheader?: boolean;
  hasError?: boolean;
  isPristine?: boolean;
  isTouched?: boolean;
  saveSuccessful?: boolean;
  saveFailed?: boolean;
  isActive: boolean;
  type?: MenuItemType;
  children?: MenuOption[];
  childMenuOpen?: boolean;
}