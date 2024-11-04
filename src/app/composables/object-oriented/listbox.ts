import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { NavigatorComposable } from './navigator';
import { ListboxProps, OptionProps } from '../types';

export abstract class ListboxComposable<T extends OptionProps> extends NavigatorComposable<T> implements ListboxProps<T> {
  abstract vertical: Signal<boolean>;
  abstract rovingFocus: Signal<boolean>;
  abstract followFocus: Signal<boolean>;
  abstract multiselectable: Signal<boolean>;
  abstract selectedIndices: WritableSignal<number[]>;

  tabindex = computed(() => (this.rovingFocus() ? -1 : 0));
  activedescendant = computed(() => this.rovingFocus() ? '' : this.activeItem()?.id() || '');

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
