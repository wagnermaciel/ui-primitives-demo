import { Signal, WritableSignal } from '@angular/core';
import { NavigationItem } from '../navigation';

export interface OptionProps extends NavigationItem {
  id: Signal<string>;
  active: Signal<boolean>; // Do we want to expose helpers like this or be more strict?
  setsize: Signal<number>;
  posinset: Signal<number>;
  tabindex: Signal<number>;
  selected: Signal<boolean>;
}

export type OptionInputs = Pick<OptionProps, 'disabled'>;
export type OptionRequiredInputs = {};
export type OptionOptionalInputs = OptionInputs;

export type OptionArgs = Partial<OptionOptionalInputs> & OptionRequiredInputs;
