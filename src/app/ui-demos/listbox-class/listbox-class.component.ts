import { Component } from '@angular/core';
import { ListboxClassDirective } from '../../ui-primitives/listbox/listbox-class.directive';
import { OptionClassDirective } from '../../ui-primitives/option/option-class.directive';

@Component({
  selector: 'app-listbox-class',
  standalone: true,
  imports: [ListboxClassDirective, OptionClassDirective],
  templateUrl: './listbox-class.component.html',
  styleUrl: './listbox-class.component.css',
})
export class ListboxClassComponent {
  options = Array.from({ length: 10 }).map((_, i) => `Option ${i}`);
}
