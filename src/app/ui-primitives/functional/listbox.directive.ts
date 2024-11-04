import { computed, contentChildren, Directive, input, model } from '@angular/core';
import { getListboxProps } from '../../composables/functional/listbox';
import { OptionDirective } from './option.directive';

@Directive({
  selector: '[listbox]',
  exportAs: 'listbox',
  standalone: true,
  host: {
    'role': 'listbox',
    '[attr.tabindex]': 'composable.tabindex()',
    '[attr.aria-orientation]': 'composable.orientation()',
    '[attr.aria-multiselectable]': 'composable.multiselectable()',
    '[attr.aria-activedescendant]': 'composable.activedescendant()',
    '(keydown)': 'onKeyDown($event)',
    '(pointerdown)': 'composable.onPointerDown($event)',
  }
})
export class ListboxDirective {
  wrap = input.required<boolean>();
  vertical = input.required<boolean>();
  activeIndex = model.required<number>();
  rovingFocus = input.required<boolean>();
  followFocus = input.required<boolean>();
  skipDisabled = input.required<boolean>();
  multiselectable = input.required<boolean>();
  selectedIndices = model.required<number[]>();

  children = contentChildren(OptionDirective);
  items = computed(() => this.children().map(child => child.composable));

  composable = getListboxProps(this);

  // This can also be done using effect.
  onKeyDown(event: KeyboardEvent) {
    this.composable.onKeyDown(event);
    this.children().at(this.composable.activeIndex())?.elementRef.nativeElement.focus();
  }
}
