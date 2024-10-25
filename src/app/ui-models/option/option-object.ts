import { computed, signal } from '@angular/core';
import { OptionArgs, OptionInputs, OptionOptionalInputs, OptionProps } from './option-types';
import { ListboxProps } from '../listbox/listbox-types';

let counter = 0;

export function optionModel(listbox: ListboxProps, args: OptionArgs): OptionProps {
  const inputs: OptionInputs = { ...optionDefaults(), ...args };

  const id = signal(`${counter++}`);

  const active = computed(() => listbox.activeItem().id() === id());
  const setsize = computed(() => listbox.items().length);
  const posinset = computed(() => listbox.items().findIndex(item => item.id() === id()));
  const tabindex = computed(() => listbox.rovingFocus() && active() ? 0 : -1);
  const selected = computed(() => listbox.selectedIndices().includes(posinset()));

  return {
    ...inputs,
    id,
    active,
    setsize,
    posinset,
    tabindex,
    selected,
  };
}

function optionDefaults(): OptionOptionalInputs {
  return { disabled: signal(false) };
}
