import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-quantity',
  templateUrl: './item-quantity.component.html',
  styleUrls: ['./item-quantity.component.scss'],
})
export class ItemQuantityComponent implements OnChanges, OnInit, OnDestroy {
  @HostListener('click', ['$event'])
  itemClick(event: any) {
    event && event.stopPropagation();
  }

  @Input()
  max: number;

  @Input()
  min: number;

  @Output()
  getQuantity: EventEmitter<number | null> = new EventEmitter<number | null>();

  @Input()
  value: number;

  quantity: FormControl<number | null> = new FormControl<number>(1);

  private subscriptions = new Subscription();

  get isMaxValue(): boolean {
    return this.quantity.value === this.max;
  }

  get isMinValue(): boolean {
    return this.quantity.value === this.min;
  }

  constructor() {}

  increment() {
    try {
      const currentValue = this.quantity?.value ?? 1;
      this.quantity.patchValue(currentValue + 1);
    } catch (error) {
      console.error(error);
    }
  }

  decrement(): void {
    try {
      const currentValue = this.quantity?.value ?? 1;
      this.quantity.patchValue(currentValue - 1);
    } catch (error) {
      console.error(error);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    try {
      if (changes['max'].currentValue) {
        this.quantity.addValidators([
          Validators.max(changes['max'].currentValue),
        ]);
      }
      if (changes['min'].currentValue) {
        this.quantity.addValidators([
          Validators.min(changes['min'].currentValue),
        ]);
      }

      if (changes['value'].currentValue) {
        this.quantity.patchValue(this.value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit(): void {
    try {
      this.subscriptions.add(
        this.quantity.valueChanges.subscribe((value) => {
          this.getQuantity.emit(value);
        })
      );
    } catch (error) {
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
