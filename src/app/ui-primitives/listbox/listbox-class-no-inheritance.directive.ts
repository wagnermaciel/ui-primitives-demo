import { computed, contentChildren, Directive, input, model } from '@angular/core';
import { ListboxModel } from '../../ui-models/listbox/listbox-class-no-inheritance';
import { OptionClassNoInheritanceDirective } from '../option/option-class-no-inheritance.directive';

@Directive({
  selector: '[appListboxClassNoInheritance]',
  exportAs: 'appListboxClassNoInheritance',
  standalone: true,
  host: {
    'role': 'listbox',
    '[attr.tabindex]': 'model.tabindex()',
    '[attr.aria-orientation]': 'model.orientation()',
    '[attr.aria-multiselectable]': 'model.multiselectable()',
    '[attr.aria-activedescendant]': 'model.activedescendant()',
    '(keydown)': 'onKeyDown($event)',
    '(pointerdown)': 'model.onPointerDown($event)',
  }
})
export class ListboxClassNoInheritanceDirective {
  orientation = input<string>('vertical');
  rovingFocus = input<boolean>(true);
  followFocus = input<boolean>(false);
  skipDisabled = input<boolean>(true);
  multiselectable = input<boolean>(false);
  selectedIndices = model<number[]>([]);

  children = contentChildren(OptionClassNoInheritanceDirective);
  items = computed(() => this.children().map((child) => child.model));

  model = new ListboxModel(this);

  onKeyDown(event: KeyboardEvent) {
    this.model.onKeyDown(event);
    const index = this.model.navigation.activeIndex();
    this.children().at(index)?.elementRef.nativeElement.focus();
  }
}

