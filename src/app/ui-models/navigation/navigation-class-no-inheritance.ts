import { computed, Signal, signal, WritableSignal } from '@angular/core';
import { NavigationArgs, NavigationItem, NavigationProps } from './navigation-types';

export class NavigationModel<T extends NavigationItem> implements NavigationProps<T> {
  items: Signal<readonly T[]>;

  wrap = computed(() => true);
  skipDisabled = computed(() => false);

  activeIndex = signal(0);
  activeItem = computed(() => this.items().at(this.activeIndex()));

  constructor(args: NavigationArgs<T>) {
    this.items = args.items;
    this.wrap = args.wrap ?? this.wrap;
    this.activeIndex = args.activeIndex ?? this.activeIndex;
    this.skipDisabled = args.skipDisabled ?? this.skipDisabled;
  }

  navigatePrev() {
    this.navigate(this.getPrevIndex);
  }

  navigateNext() {
    this.navigate(this.getNextIndex);
  }

  private navigate(navigateFn: (i: number) => number) {
    const index = signal(this.activeIndex());
    const isLoop = computed(() => index() === this.activeIndex());
    const shouldSkip = computed(() => this.skipDisabled() && this.items().at(index())?.disabled());

    do {
      index.update(navigateFn);
    } while (shouldSkip() && !isLoop());

    this.activeIndex.set(index());
  }

  getPrevIndex = (index: number): number => {
    const endIndex = this.items().length - 1;
    const prevIndex = this.wrap() && index === 0 ? endIndex : index - 1;
    return Math.min(endIndex, prevIndex);
  }

  getNextIndex = (index: number): number => {
    const endIndex = this.items().length - 1;
    const nextIndex = this.wrap() && index === endIndex ? 0 : index + 1;
    return Math.max(0, nextIndex);
  }
}
