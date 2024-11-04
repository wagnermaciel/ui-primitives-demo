import { Signal, WritableSignal } from '@angular/core';
import { NavigatorInputs, NavigatorProps } from './navigator';
import { OptionProps } from './option';

export interface ListboxProps<T extends OptionProps> extends NavigatorProps<T> {
  tabindex: Signal<number>;
  vertical: Signal<boolean>;
  followFocus: Signal<boolean>;
  rovingFocus: Signal<boolean>;
  activedescendant: Signal<string>;
  multiselectable: Signal<boolean>;
  selectedIndices: WritableSignal<number[]>;

  onKeyDown: (event: KeyboardEvent) => void;
  onPointerDown: (event: PointerEvent) => void;
}

export type ListboxInputs<T extends OptionProps> = Pick<ListboxProps<T>, 'vertical' | 'followFocus' | 'rovingFocus' | 'multiselectable' | 'selectedIndices'>
  & NavigatorInputs<T>;
