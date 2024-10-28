import { computed, signal, Signal } from '@angular/core';
import { OptionArgs, OptionProps } from '../option/option-types';
import { ListboxModel } from '../listbox/listbox-class';

let counter = 0;

export class OptionModel implements OptionProps {
  listbox = new ListboxModel();

  id = signal(`${counter++}`);
  disabled = computed(() => false);
  active = computed(() => this.listbox.activeItem()?.id() === this.id());
  setsize = computed(() => this.listbox.items().length);
  posinset = computed(() => this.listbox.items().findIndex(item => item.id() === this.id()));
  tabindex = computed(() => this.listbox.rovingFocus() && this.active() ? 0 : -1);
  selected = computed(() => this.listbox.selectedIndices().includes(this.posinset()));
}
