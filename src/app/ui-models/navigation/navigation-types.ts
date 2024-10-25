import { Signal, WritableSignal } from "@angular/core";

export interface NavigationItem {
  disabled: Signal<boolean>;
}

export interface NavigationProps<T extends NavigationItem> {
  items: Signal<readonly T[]>;
  wrap: Signal<boolean>;
  activeItem: Signal<T>;
  skipDisabled: Signal<boolean>;
  activeIndex: WritableSignal<number>;
  navigatePrev: () => void;
  navigateNext: () => void;
}

export type NavigationInputs<T extends NavigationItem> = Pick<NavigationProps<T>, 'items' | 'wrap' | 'skipDisabled' | 'activeIndex'>;
export type NavigationRequiredInputs<T extends NavigationItem> = Pick<NavigationInputs<T>, 'items'>;
export type NavigationOptionalInputs<T extends NavigationItem> = Omit<NavigationInputs<T>, 'items'>;

export type NavigationArgs<T extends NavigationItem> = Partial<NavigationOptionalInputs<T>> & NavigationRequiredInputs<T>;
