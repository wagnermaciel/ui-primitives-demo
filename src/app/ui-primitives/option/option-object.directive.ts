import { Directive, ElementRef, inject, model } from '@angular/core';
import { ListboxObjectDirective } from '../listbox/listbox-object.directive';
import { optionModel } from '../../ui-models/option/option-object';

@Directive({
  selector: '[appOptionObject]',
  exportAs: 'appOptionObject',
  standalone: true,
  host: {
    'role': 'option',
    '[attr.id]': 'model.id()',
    '[attr.tabindex]': 'model.tabindex()',
    '[attr.aria-setsize]': 'model.setsize()',
    '[attr.aria-posinset]': 'model.posinset()',
    '[attr.aria-selected]': 'model.selected()',
    '[attr.aria-disabled]': 'model.disabled()',
  }
})
export class OptionObjectDirective {
  disabled = model(false);

  model = optionModel(this);
  elementRef = inject(ElementRef);
  listbox = inject(ListboxObjectDirective).model;
}
