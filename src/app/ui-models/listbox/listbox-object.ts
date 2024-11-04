import { computed, signal } from '@angular/core';
import { ListboxArgs, ListboxInputs, ListboxOptionalInputs, ListboxProps } from './listbox-types';
import { navigationModel } from '../navigation/navigation-object';
import { NavigationProps } from '../navigation';
import { OptionProps } from '../option/option-types';

// Less of an Angular style.
// Talk with Alex & Pawel about this. See if this fits their vision for the future of Angular.

export function listboxModel(args: ListboxArgs): ListboxProps {
  const navigation = navigationModel(args);
  const inputs: ListboxInputs = { ...listboxDefaults(), ...args };

  const tabindex = computed(() => inputs.rovingFocus() ? -1 : 0);
  const activedescendant = computed(() => inputs.rovingFocus() ? '' : navigation.activeItem()?.id() ?? '');

  return {
    ...inputs,
    ...navigation,
    tabindex,
    activedescendant,
    onKeyDown: (event) => onKeyDown(navigation, event),
    onPointerDown,
  };
}

function onKeyDown(navigation: NavigationProps<OptionProps>, event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowUp':
      return navigation.navigatePrev();
    case 'ArrowDown':
      return navigation.navigateNext();
    case 'ArrowLeft':
      return navigation.navigatePrev();
    case 'ArrowRight':
      return navigation.navigateNext();
  }
}

function onPointerDown(event: PointerEvent) {
  console.log(event);
}

function listboxDefaults(): ListboxOptionalInputs {
  return {
    orientation: computed(() => 'vertical'),
    rovingFocus: computed(() => true),
    followFocus: computed(() => false),
    multiselectable: computed(() => true),
    selectedIndices: signal([0]),
  };
}
