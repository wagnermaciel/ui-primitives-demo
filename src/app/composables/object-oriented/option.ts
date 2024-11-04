import { computed, Signal, signal } from '@angular/core';
import { OptionProps } from '../types/option';
import { ListboxComposable } from './listbox';

let counter = 0;

export abstract class OptionComposable implements OptionProps {
  abstract disabled: Signal<boolean>;
  abstract listbox: ListboxComposable<OptionComposable>;

  id = signal(`${counter++}`);
  active = computed(() => this.listbox.activeItem()?.id() === this.id());
  setsize = computed(() => this.listbox.items().length);
  posinset = computed(() => this.listbox.items().findIndex(item => item.id() === this.id()));
  tabindex = computed(() => this.listbox.rovingFocus() && this.active() ? 0 : -1);
  selected = computed(() => this.listbox.selectedIndices().includes(this.posinset()));
}
