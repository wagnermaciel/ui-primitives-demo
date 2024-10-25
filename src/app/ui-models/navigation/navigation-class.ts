import { computed, signal, Signal, WritableSignal } from '@angular/core';
import { NavigationArgs, NavigationItem, NavigationOptionalInputs, NavigationProps } from './navigation-types';

export class Navigation<T extends NavigationItem> implements NavigationProps<T> {
  wrap: Signal<boolean>;
  items: Signal<T[]>;
  skipDisabled: Signal<boolean>;
  activeIndex: WritableSignal<number>;
  activeItem = computed(() => this.getItem(this.activeIndex()));

  constructor(args: NavigationArgs<T>) {
    const inputs = { ...this.navigationDefaults(), ...args };
    this.wrap = inputs.wrap;
    this.items = inputs.items;
    this.activeIndex = inputs.activeIndex;
    this.skipDisabled = inputs.skipDisabled;
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
    const shouldSkip = computed(() => this.skipDisabled() && this.getItem(index()).disabled());

    do {
      index.update(navigateFn);
    } while (shouldSkip() && !isLoop());

    this.activeIndex.set(index());
  }

  private getItem(index: number): T {
    return this.items()[index];
  }

  private getPrevIndex(index: number): number {
    const endIndex = this.items().length - 1;
    const prevIndex = this.wrap() && index === 0 ? endIndex : index - 1;
    return Math.min(endIndex, prevIndex);
  }

  private getNextIndex(index: number): number {
    const endIndex = this.items().length - 1;
    const nextIndex = this.wrap() && index === endIndex ? 0 : index + 1;
    return Math.max(0, nextIndex);
  }

  private navigationDefaults(): NavigationOptionalInputs<T> {
    return {
      wrap: signal(true),
      activeIndex: signal(0),
      skipDisabled: signal(false),
    };
  }
}
