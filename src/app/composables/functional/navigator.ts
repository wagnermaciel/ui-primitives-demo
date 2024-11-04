import { computed, signal } from '@angular/core';
import { NavigatorInputs, NavigatorItem, NavigatorProps } from '../types/navigator';

export function getNavigatorProps<T extends NavigatorItem>(args: NavigatorInputs<T>): NavigatorProps<T> {
  return {
    ...args,
    activeItem: computed(() => args.items()[args.activeIndex()]),
    navigatePrev: () => navigate(args, getPrevIndex),
    navigateNext: () => navigate(args, getNextIndex),
  };
}

function navigate<T extends NavigatorItem>(inputs: NavigatorInputs<T>, navigateFn: (inputs: NavigatorInputs<T>, i: number) => number) {
  const index = signal(inputs.activeIndex());
  const isLoop = computed(() => index() === inputs.activeIndex());
  const shouldSkip = computed(() => inputs.skipDisabled() && inputs.items()[index()]?.disabled());

  do {
    index.update((i) => navigateFn(inputs, i));
  } while (shouldSkip() && !isLoop());

  inputs.activeIndex.set(index());
}

function getPrevIndex<T extends NavigatorItem>({ items, wrap }: NavigatorInputs<T>, index: number): number {
  const endIndex = items().length - 1;
  const prevIndex = wrap() && index === 0 ? endIndex : index - 1;
  return Math.min(endIndex, prevIndex);
}

function getNextIndex<T extends NavigatorItem>({ items, wrap }: NavigatorInputs<T>, index: number): number {
  const endIndex = items().length - 1;
  const nextIndex = wrap() && index === endIndex ? 0 : index + 1;
  return Math.max(0, nextIndex);
}
