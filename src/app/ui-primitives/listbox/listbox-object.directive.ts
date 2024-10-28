import { computed, contentChildren, Directive, input, model } from '@angular/core';
import { listboxModel } from '../../ui-models/listbox/listbox-object';
import { OptionObjectDirective } from '../option/option-object.directive';

@Directive({
  selector: '[appListboxObject]',
  exportAs: 'appListboxObject',
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
export class ListboxObjectDirective {
  orientation = input<string>('vertical');
  rovingFocus = input<boolean>(true);
  followFocus = input<boolean>(false);
  skipDisabled = input<boolean>(true);
  multiselectable = input<boolean>(false);
  selectedIndices = model<number[]>([]);

  children = contentChildren(OptionObjectDirective);
  items = computed(() => this.children().map(child => child.model));

  model = listboxModel(this);

  onKeyDown(event: KeyboardEvent) {
    this.model.onKeyDown(event);
    this.children().at(this.model.activeIndex())?.elementRef.nativeElement.focus();
  }
}
