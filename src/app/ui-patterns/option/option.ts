import { computed } from '@angular/core';
import { Option } from './types';
import { Listbox } from '../listbox/listbox-types';

type OptionInputs = Pick<Option, 'disabled'>;

let counter = 0;

export function uiOption(listbox: Listbox, inputs: OptionInputs): Option {
  const id = computed(() => `ui-option-${counter++}`);
  const setsize = computed(() => listbox.options().length);
  const active = computed(() => listbox.activeIndex() === posinset());
  const posinset = computed(() => listbox.options().findIndex((o) => o.id() === id()));
  const selected = computed(() => listbox.selectedIndices().includes(posinset()));
  const tabindex = listbox.rovingFocus()
    ? computed(() => (active() ? 0 : -1))
    : computed(() => -1);

  return {
    ...inputs,
    id,
    setsize,
    posinset,
    tabindex,
    selected,
  };
}
