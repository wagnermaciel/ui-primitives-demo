import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { ListboxProps } from './listbox-types';
import { NavigationModel } from '../navigation/navigation-class';
import { OptionProps } from '../option/option-types';

export class ListboxModel extends NavigationModel<OptionProps> implements ListboxProps {
  selectedIndices = signal<number[]>([]);

  orientation = computed(() => 'vertical');
  rovingFocus = computed(() => true);
  followFocus = computed(() => false);
  multiselectable = computed(() => false);

  tabindex = computed(() => (this.rovingFocus() ? -1 : 0));
  activedescendant = computed(() => this.rovingFocus() ? '' : this.activeItem().id());

  constructor() {
    super();

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
}
