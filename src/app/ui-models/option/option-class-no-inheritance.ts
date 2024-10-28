import { computed, signal } from '@angular/core';
import { OptionArgs, OptionProps } from '../option/option-types';
import { ListboxModel } from '../listbox/listbox-class-no-inheritance';

let counter = 0;

export class OptionModel implements OptionProps {
  listbox: ListboxModel<OptionProps>;

  id = signal(`${counter++}`);
  disabled = computed(() => false);
  active = computed(() => this.listbox.navigation.activeItem()?.id() === this.id());
  setsize = computed(() => this.listbox.navigation.items().length);
  posinset = computed(() => this.listbox.navigation.items().findIndex(item => item.id() === this.id()));
  tabindex = computed(() => this.listbox.rovingFocus() && this.active() ? 0 : -1);
  selected = computed(() => this.listbox.selectedIndices().includes(this.posinset()));

  constructor(args: OptionArgs & { listbox: ListboxModel<OptionProps> }) {
    this.listbox = args.listbox;
    this.disabled = args.disabled ?? this.disabled;
    console.log(this.listbox);
  }
}
