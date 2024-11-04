import { Directive, ElementRef, inject, model } from '@angular/core';
import { OptionComposable } from '../../composables/object-oriented/option';
import { ListboxDirective } from './listbox.directive';

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
export class OptionClassDirective extends OptionComposable {
  disabled = model.required<boolean>();
  elementRef = inject(ElementRef);
  listbox = inject<ListboxDirective>(ListboxDirective);
}
