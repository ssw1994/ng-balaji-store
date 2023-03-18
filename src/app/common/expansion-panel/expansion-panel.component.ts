import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-expansion-panel',
  templateUrl: './expansion-panel.component.html',
  styleUrls: ['./expansion-panel.component.scss'],
})
export class ExpansionPanelComponent implements OnChanges {
  @Input()
  title: string;

  @Input()
  expanded: boolean;

  private _isExpanded = false;

  get isExpanded(): boolean {
    return this._isExpanded;
  }

  set isExpanded(expanded: boolean) {
    this._isExpanded = expanded;
  }

  toggleExpansion() {
    this.isExpanded = !this.isExpanded;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (
      changes['expanded']?.currentValue &&
      changes['expanded']?.currentValue === true
    ) {
      this.isExpanded = true;
    }
  }
}
