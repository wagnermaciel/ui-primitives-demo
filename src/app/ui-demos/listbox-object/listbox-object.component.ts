import { Component } from '@angular/core';
import { ListboxObjectDirective } from '../../ui-primitives/listbox/listbox-object.directive';
import { OptionObjectDirective } from '../../ui-primitives/option/option-object.directive';

@Component({
  selector: 'app-listbox-object',
  standalone: true,
  imports: [ListboxObjectDirective, OptionObjectDirective],
  templateUrl: './listbox-object.component.html',
})
export class ListboxObjectComponent {}
