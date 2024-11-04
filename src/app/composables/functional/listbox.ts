import { computed } from '@angular/core';
import { getNavigatorProps } from './navigator';
import { ListboxInputs, ListboxProps, NavigatorProps, OptionProps } from '../types';

// Less of an Angular style.
// Talk with Alex & Pawel about this. See if this fits their vision for the future of Angular.

export function getListboxProps(args: ListboxInputs<OptionProps>): ListboxProps<OptionProps> {
  const navigator = getNavigatorProps<OptionProps>(args);

  const tabindex = computed(() => args.rovingFocus() ? -1 : 0);
  const activedescendant = computed(() => args.rovingFocus() ? '' : navigator.activeItem()?.id() ?? '');

  return {
    ...args,
    ...navigator,
    tabindex,
    activedescendant,
    onKeyDown: (event) => onKeyDown(navigator, event),
    onPointerDown,
  };
}

function onKeyDown(navigator: NavigatorProps<OptionProps>, event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp':
      return navigator.navigatePrev();
    case 'ArrowDown':
      return navigator.navigateNext();
    case 'ArrowLeft':
      return navigator.navigatePrev();
    case 'ArrowRight':
      return navigator.navigateNext();
  }
}

function onPointerDown(event: PointerEvent) {
  console.log(event);
}
