import { Directive, ElementRef, inject, model } from '@angular/core';
import { OptionModel } from '../../ui-models/option/option-class';
import { ListboxClassDirective } from '../listbox/listbox-class.directive';

@Directive({
  selector: '[appOptionClass]',
  exportAs: 'appOptionClass',
  standalone: true,
  host: {
    'role': 'option',
    '[attr.id]': 'id()',
    '[attr.tabindex]': 'tabindex()',
    '[attr.aria-setsize]': 'setsize()',
    '[attr.aria-posinset]': 'posinset()',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-disabled]': 'disabled()',
  }
})
export class OptionClassDirective extends OptionModel {
  override disabled = model(false);
  override listbox = inject(ListboxClassDirective);

  elementRef = inject(ElementRef);
}
