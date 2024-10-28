import { computed, signal } from '@angular/core';
import { ListboxArgs, ListboxProps } from './listbox-types';
import { NavigationModel } from '../navigation/navigation-class-no-inheritance';
import { OptionProps } from '../option/option-types';
import { NavigationArgs, NavigationProps } from '../navigation';

export class ListboxModel<T extends OptionProps> implements Omit<ListboxProps, keyof NavigationProps<T>> {
  selectedIndices = signal<number[]>([]);

  orientation = computed(() => 'vertical');
  rovingFocus = computed(() => true);
  followFocus = computed(() => false);
  multiselectable = computed(() => false);

  tabindex = computed(() => (this.rovingFocus() ? -1 : 0));
  activedescendant = computed(() => this.rovingFocus() ? '' : this.navigation.activeItem()?.id() || '');

  navigation: NavigationModel<T>;

  constructor(args: ListboxArgs & NavigationArgs<T>) {
    this.navigation = new NavigationModel(args);

    if (this.multiselectable() && this.followFocus()) {
      throw Error('A listbox cannot be multiselectable and have selection follow focus.');
    }
  }

  onKeyDown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        return this.navigation.navigatePrev();
      case 'ArrowDown':
        return this.navigation.navigateNext();
      case 'ArrowLeft':
        return this.navigation.navigatePrev();
      case 'ArrowRight':
        return this.navigation.navigateNext();
    }
  }

  onPointerDown(event: PointerEvent) {
    console.log(event);
  }
}
