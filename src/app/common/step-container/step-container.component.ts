import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-step-container',
  templateUrl: './step-container.component.html',
  styleUrls: ['./step-container.component.scss'],
})
export class StepContainerComponent {
  @Input()
  primaryButton: string;

  @Input()
  title: string;

  @Output()
  actionClick: EventEmitter<any> = new EventEmitter<any>();
}
