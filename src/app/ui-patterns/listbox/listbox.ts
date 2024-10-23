import { computed } from '@angular/core';
import { Listbox } from './listbox-types';

type ListboxInputs = Omit<Listbox, 'activedescendant' | 'tabindex'>;

export function uiListbox(inputs: ListboxInputs): Listbox {
  const activeOption = computed(() => inputs.options().find((o) => o.posinset() === inputs.activeIndex()));

  const activedescendant = inputs.rovingFocus()
    ? computed(() => '')
    : computed(() => activeOption()?.id() ?? '');

  const tabindex = inputs.rovingFocus()
    ? computed(() => -1)
    : computed(() => 0);

  return { ...inputs, tabindex, activedescendant };
}
