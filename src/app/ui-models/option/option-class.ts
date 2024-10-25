import { computed, signal, Signal } from '@angular/core';
import { OptionArgs, OptionInputs, OptionOptionalInputs, OptionProps } from '../option/option-types';
import { ListboxProps } from '../listbox/listbox-types';

let counter = 0;

export class uiOption implements OptionProps {
  disabled: Signal<boolean>;

  id = signal(`${counter++}`);
  active = computed(() => this.listbox.activeItem().id() === this.id());
  setsize = computed(() => this.listbox.items().length);
  posinset = computed(() => this.listbox.items().findIndex(item => item.id() === this.id()));
  tabindex = computed(() => this.listbox.rovingFocus() && this.active() ? 0 : -1);
  selected = computed(() => this.listbox.selectedIndices().includes(this.posinset()));

  constructor(private listbox: ListboxProps, args: OptionArgs) {
    const inputs: OptionInputs = { ...this.optionDefaults(), ...args };
    this.disabled = inputs.disabled;
  }

  private optionDefaults(): OptionOptionalInputs {
    return { disabled: signal(false) };
  }
}
