import { Component } from '@angular/core';
import { ListboxClassNoInheritanceDirective } from '../../ui-primitives/listbox/listbox-class-no-inheritance.directive';
import { OptionClassNoInheritanceDirective } from '../../ui-primitives/option/option-class-no-inheritance.directive';

@Component({
  selector: 'app-listbox-class-no-inheritance',
  standalone: true,
  imports: [ListboxClassNoInheritanceDirective, OptionClassNoInheritanceDirective],
  templateUrl: './listbox-class-no-inheritance.component.html',
  styleUrl: './listbox-class-no-inheritance.component.css'
})
export class ListboxClassNoInheritanceComponent {
  options = Array.from({ length: 10 }).map((_, i) => `Option ${i}`);
}
