import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { NavigatorItem, NavigatorProps } from '../types/navigator';

export abstract class NavigatorComposable<T extends NavigatorItem> implements NavigatorProps<T> {
  abstract wrap: Signal<boolean>;
  abstract items: Signal<readonly T[]>;
  abstract skipDisabled: Signal<boolean>;
  abstract activeIndex: WritableSignal<number>;

  activeItem = computed(() => this.items()[this.activeIndex()]);

  navigatePrev() {
    this.navigate(this.getPrevIndex);
  }

  navigateNext() {
    this.navigate(this.getNextIndex);
  }

  private navigate(navigateFn: (i: number) => number) {
    const index = signal(this.activeIndex());
    const isLoop = computed(() => index() === this.activeIndex());
    const shouldSkip = computed(() => this.skipDisabled() && this.items()[index()]?.disabled());

    do {
      index.update(navigateFn);
    } while (shouldSkip() && !isLoop());

    this.activeIndex.set(index());
  }

  getPrevIndex = (index: number): number => {
    const endIndex = this.items().length - 1;
    const prevIndex = this.wrap() && index === 0 ? endIndex : index - 1;
    return Math.max(0, prevIndex);
  }

  getNextIndex = (index: number): number => {
    const endIndex = this.items().length - 1;
    const nextIndex = this.wrap() && index === endIndex ? 0 : index + 1;
    return Math.min(endIndex, nextIndex);
  }
}
