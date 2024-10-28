import { contentChildren, Directive, input, model } from '@angular/core';
import { ListboxModel } from '../../ui-models/listbox/listbox-class';
import { OptionClassDirective } from '../option/option-class.directive';

@Directive({
  selector: '[appListboxClass]',
  exportAs: 'appListboxClass',
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
export class ListboxClassDirective extends ListboxModel<OptionClassDirective> {
  override wrap = input<boolean>(true);
  override orientation = input<string>('vertical');
  override rovingFocus = input<boolean>(true);
  override followFocus = input<boolean>(false);
  override multiselectable = input<boolean>(false);
  override skipDisabled = input<boolean>(false);
  override selectedIndices = model<number[]>([]);

  override items = contentChildren(OptionClassDirective);

  override onKeyDown(event: KeyboardEvent) {
    super.onKeyDown(event);
    this.activeItem()?.elementRef.nativeElement.focus();
  }
}
