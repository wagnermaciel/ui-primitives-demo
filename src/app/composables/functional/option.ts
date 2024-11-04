import { computed, signal } from '@angular/core';
import { OptionInputs, OptionProps } from '../types/option';
import { ListboxProps } from '../types/listbox';

let counter = 0;

export function getOptionProps<T extends OptionProps>(args: OptionInputs & { listbox: ListboxProps<T> }): OptionProps {
  const id = signal(`${counter++}`);
  const active = computed(() => args.listbox.activeItem()?.id() === id());
  const posinset = computed(() => args.listbox.items().findIndex(item => item.id() === id()));

  return {
    ...args,
    id,
    active,
    posinset,
    setsize: computed(() => args.listbox.items().length),
    tabindex: computed(() => args.listbox.rovingFocus() && active() ? 0 : -1),
    selected: computed(() => args.listbox.selectedIndices().includes(posinset())),
  };
}
