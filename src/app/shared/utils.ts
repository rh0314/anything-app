import { MenuOption, FormGroupMenuOption } from '../models/menu-option.model';

export function menuOptionToFgMenuOption(option: MenuOption): FormGroupMenuOption {
  let fgOption: FormGroupMenuOption = {
    id: option.id,
    isActive: false
  }
  const keys = Object.keys(option);
  if (keys && keys.length) {
    keys.forEach(key => {
      fgOption[key] = option[key];
    });
  }

  return fgOption;
}

export function allMenuOptionsToFgMenuOptions(options: MenuOption[]): FormGroupMenuOption[] {
  let fgOptions: FormGroupMenuOption[] = [];
  options.forEach((option, idx) => {
    const fgOption = menuOptionToFgMenuOption(option);
    fgOptions.push(fgOption);
  });
  return fgOptions;
}

export function fgMenuOptionToMenuOption(fgOption: FormGroupMenuOption): MenuOption {
  let option: MenuOption = new MenuOption();
  const keys = Object.keys(fgOption);
  if (keys && keys.length) {
    keys.forEach(key => {
      if (key !== 'isActive') {
        option[key] = fgOption[key]
      }
    });
  }

  return option;
}