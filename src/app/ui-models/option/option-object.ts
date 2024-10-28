import { computed, signal } from '@angular/core';
import { OptionArgs, OptionInputs, OptionOptionalInputs, OptionProps } from './option-types';
import { ListboxProps } from '../listbox/listbox-types';

let counter = 0;

export function optionModel(args: OptionArgs & { listbox: ListboxProps }): OptionProps {
  const inputs: OptionInputs = { ...optionDefaults(), ...args };

  const id = signal(`${counter++}`);
  const active = computed(() => args.listbox.activeItem()?.id() === id());
  const posinset = computed(() => args.listbox.items().findIndex(item => item.id() === id()));

  return {
    ...inputs,
    id,
    active,
    posinset,
    setsize: computed(() => args.listbox.items().length),
    tabindex: computed(() => args.listbox.rovingFocus() && active() ? 0 : -1),
    selected: computed(() => args.listbox.selectedIndices().includes(posinset())),
  };
}

function optionDefaults(): OptionOptionalInputs {
  return { disabled: signal(false) };
}
