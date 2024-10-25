import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { OptionProps } from '../option/option-types';
import { ListboxArgs, ListboxInputs, ListboxOptionalInputs, ListboxProps } from './listbox-types';
import { Navigation } from '../navigation/navigation-class';

export class uiListbox extends Navigation<OptionProps> implements ListboxProps {
  orientation: Signal<string>;
  followFocus: Signal<boolean>;
  rovingFocus: Signal<boolean>;
  multiselectable: Signal<boolean>;
  selectedIndices: WritableSignal<number[]>;

  tabindex = computed(() => (this.rovingFocus() ? -1 : 0));
  activedescendant = computed(() => this.rovingFocus() ? '' : this.activeItem().id());

  constructor(args: ListboxArgs) {
    super({ ...args });
    const inputs: ListboxInputs = { ...this.listboxDefaults(), ...args };
    this.orientation = inputs.orientation;
    this.followFocus = inputs.followFocus;
    this.rovingFocus = inputs.rovingFocus;
    this.multiselectable = inputs.multiselectable;
    this.selectedIndices = inputs.selectedIndices;

    if (this.multiselectable() && this.followFocus()) {
      throw Error('A listbox cannot be multiselectable and have selection follow focus.');
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        return this.navigatePrev();
      case 'ArrowDown':
        return this.navigateNext();
      case 'ArrowLeft':
        return this.navigatePrev();
      case 'ArrowRight':
        return this.navigateNext();
    }
  }

  onPointerDown(event: PointerEvent) {
    console.log(event);
  }

  private listboxDefaults(): ListboxOptionalInputs {
    return {
      orientation: computed(() => 'vertical'),
      rovingFocus: computed(() => true),
      followFocus: computed(() => false),
      multiselectable: computed(() => true),
      selectedIndices: signal([0]),
    };
  }
}
