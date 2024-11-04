import { contentChildren, Directive, input, model } from '@angular/core';
import { ListboxComposable } from '../../composables/object-oriented/listbox';
import { OptionClassDirective } from './option.directive';

@Directive({
  selector: '[listbox]',
  exportAs: 'listbox',
  standalone: true,
  host: {
    'role': 'listbox',
    '[attr.tabindex]': 'tabindex()',
    '[attr.aria-orientation]': 'orientation()',
    '[attr.aria-multiselectable]': 'multiselectable()',
    '[attr.aria-activedescendant]': 'activedescendant()',
    '(keydown)': 'onKeyDown($event)',
    '(pointerdown)': 'onPointerDown($event)',
  }
})
export class ListboxDirective extends ListboxComposable<OptionClassDirective> {
  wrap = input.required<boolean>();
  vertical = input.required<boolean>();
  activeIndex = model.required<number>();
  rovingFocus = input.required<boolean>();
  followFocus = input.required<boolean>();
  skipDisabled = input.required<boolean>();
  multiselectable = input.required<boolean>();
  selectedIndices = model.required<number[]>();

  items = contentChildren<OptionClassDirective>(OptionClassDirective);

  // This can also be done using effect.
  override onKeyDown(event: KeyboardEvent) {
    super.onKeyDown(event);
    this.activeItem()?.elementRef.nativeElement.focus();
  }
}
