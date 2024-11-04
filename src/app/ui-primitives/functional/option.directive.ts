import { Directive, ElementRef, inject, model } from '@angular/core';
import { ListboxDirective } from './listbox.directive';
import { getOptionProps } from '../../composables/functional/option';

@Directive({
  selector: '[appOptionObject]',
  exportAs: 'appOptionObject',
  standalone: true,
  host: {
    'role': 'option',
    '[attr.id]': 'composable.id()',
    '[attr.tabindex]': 'composable.tabindex()',
    '[attr.aria-setsize]': 'composable.setsize()',
    '[attr.aria-posinset]': 'composable.posinset()',
    '[attr.aria-selected]': 'composable.selected()',
    '[attr.aria-disabled]': 'composable.disabled()',
  }
})
export class OptionDirective {
  disabled = model.required<boolean>();
  composable = getOptionProps(this);
  elementRef = inject(ElementRef);
  listbox = inject(ListboxDirective).composable;
}
