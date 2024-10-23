import { Signal, WritableSignal } from '@angular/core';
import { Option } from '../option/types';

export interface Listbox extends ListboxModel {
  wrap: Signal<boolean>;
  tabindex: Signal<number>;
  orientation: Signal<string>;
  followFocus: Signal<boolean>;
  rovingFocus: Signal<boolean>;
  activedescendant: Signal<string>;
  multiselectable: Signal<boolean>;
  options: Signal<Option[]>;

  onKeydown: () => {};
  onPointerDown: () => {};
}

export interface ListboxModel {
  activeIndex: WritableSignal<number>;
  selectedIndices: WritableSignal<number[]>;
}
