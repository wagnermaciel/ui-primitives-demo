import { Signal, WritableSignal } from "@angular/core";

export interface NavigatorItem {
  disabled: Signal<boolean>;
}

export interface NavigatorProps<T extends NavigatorItem> {
  items: Signal<readonly T[]>;
  wrap: Signal<boolean>;
  activeItem: Signal<T | undefined>;
  skipDisabled: Signal<boolean>;
  activeIndex: WritableSignal<number>;
  navigatePrev: () => void;
  navigateNext: () => void;
}

export type NavigatorInputs<T extends NavigatorItem> = Pick<NavigatorProps<T>, 'items' | 'wrap' | 'skipDisabled' | 'activeIndex'>;
