import { Signal } from '@angular/core';
import { NavigatorItem } from './navigator';

export interface OptionProps extends NavigatorItem {
  id: Signal<string>;
  active: Signal<boolean>;
  setsize: Signal<number>;
  posinset: Signal<number>;
  tabindex: Signal<number>;
  selected: Signal<boolean>;
}

export type OptionInputs = Pick<OptionProps, 'disabled'>;
