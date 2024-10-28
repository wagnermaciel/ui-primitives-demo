import { Routes } from '@angular/router';
import { ListboxClassComponent } from './ui-demos/listbox-class/listbox-class.component';
import { ListboxObjectComponent } from './ui-demos/listbox-object/listbox-object.component';
import { ListboxClassNoInheritanceComponent } from './ui-demos/listbox-class-no-inheritance/listbox-class-no-inheritance.component';

export const routes: Routes = [
  { path: 'listbox-class', component: ListboxClassComponent },
  { path: 'listbox-class-no-inheritance', component: ListboxClassNoInheritanceComponent },
  { path: 'listbox-object', component: ListboxObjectComponent },
];
