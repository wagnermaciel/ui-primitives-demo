import { computed, signal } from '@angular/core';
import { NavigationArgs, NavigationInputs, NavigationItem, NavigationOptionalInputs, NavigationProps } from './navigation-types';

export function navigationModel<T extends NavigationItem>(args: NavigationArgs<T>): NavigationProps<T> {
  const inputs: NavigationInputs<T> = { ...navigationDefaults(), ...args };

  return {
    ...inputs,
    activeItem: computed(() => inputs.items().at(inputs.activeIndex())),
    navigatePrev: () => navigate(inputs, getPrevIndex),
    navigateNext: () => navigate(inputs, getNextIndex),
  };
}

function navigate<T extends NavigationItem>(inputs: NavigationInputs<T>, navigateFn: (inputs: NavigationInputs<T>, i: number) => number) {
  const index = signal(inputs.activeIndex());
  const isLoop = computed(() => index() === inputs.activeIndex());
  const shouldSkip = computed(() => inputs.skipDisabled() && inputs.items().at(index())?.disabled());

  do {
    index.update((i) => navigateFn(inputs, i));
  } while (shouldSkip() && !isLoop());

  inputs.activeIndex.set(index());
}

function getPrevIndex<T extends NavigationItem>({ items, wrap }: NavigationInputs<T>, index: number): number {
  const endIndex = items().length - 1;
  const prevIndex = wrap() && index === 0 ? endIndex : index - 1;
  return Math.min(endIndex, prevIndex);
}

function getNextIndex<T extends NavigationItem>({ items, wrap }: NavigationInputs<T>, index: number): number {
  const endIndex = items().length - 1;
  const nextIndex = wrap() && index === endIndex ? 0 : index + 1;
  return Math.max(0, nextIndex);
}

function navigationDefaults<T extends NavigationItem>(): NavigationOptionalInputs<T> {
  return {
    wrap: signal(true),
    activeIndex: signal(0),
    skipDisabled: signal(false),
  };
}
