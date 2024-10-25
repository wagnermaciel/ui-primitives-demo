import { Signal, WritableSignal } from '@angular/core';
import { NavigationArgs, NavigationProps } from '../navigation';
import { OptionProps } from '../option/option-types';

export interface ListboxProps extends NavigationProps<OptionProps> {
  tabindex: Signal<number>;
  orientation: Signal<string>;
  followFocus: Signal<boolean>;
  rovingFocus: Signal<boolean>;
  activedescendant: Signal<string>;
  multiselectable: Signal<boolean>;
  selectedIndices: WritableSignal<number[]>;

  onKeyDown: (event: KeyboardEvent) => void;
  onPointerDown: (event: PointerEvent) => void;
}

export type ListboxInputs = Pick<ListboxProps, 'orientation' | 'followFocus' | 'rovingFocus' | 'multiselectable' | 'selectedIndices'>;
export type ListboxRequiredInputs = {};
export type ListboxOptionalInputs = ListboxInputs;

export type ListboxArgs = Partial<ListboxOptionalInputs> & ListboxRequiredInputs & NavigationArgs<OptionProps>;
