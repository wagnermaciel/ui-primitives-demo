import { Signal } from '@angular/core';

export interface Option {
  id: Signal<string>;
  setsize: Signal<number>;
  posinset: Signal<number>;
  tabindex: Signal<number>;
  disabled: Signal<boolean>;
  selected: Signal<boolean>;
}
