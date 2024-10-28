import { Directive, ElementRef, inject, model } from '@angular/core';
import { OptionModel } from '../../ui-models/option/option-class-no-inheritance';
import { ListboxClassNoInheritanceDirective } from '../listbox/listbox-class-no-inheritance.directive';
import { OptionProps } from '../../ui-models/option/option-types';
import { ListboxModel } from '../../ui-models/listbox/listbox-class-no-inheritance';

@Directive({
  selector: '[appOptionClassNoInheritance]',
  exportAs: 'appOptionClassNoInheritance',
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
export class OptionClassNoInheritanceDirective {
  disabled = model<boolean>(false);

  model: OptionProps;
  elementRef = inject(ElementRef);

  listbox: ListboxModel<OptionProps>;
  parent = inject(ListboxClassNoInheritanceDirective);

  constructor() {
    this.listbox = this.parent.model;
    this.model = new OptionModel(this);
  }
}
