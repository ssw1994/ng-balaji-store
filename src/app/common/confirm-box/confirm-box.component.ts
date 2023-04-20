import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ConfirmChoice, ConfirmConfig } from '../constants';

@Component({
  standalone: true,
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss'],
  imports: [MatDialogModule, MatButtonModule],
})
export class ConfirmBoxComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmConfig,
    private dialogRef: MatDialogRef<ConfirmBoxComponent>
  ) {}

  cancel() {
    this.dialogRef.close(ConfirmChoice.cancel);
  }

  confirm() {
    this.dialogRef.close(ConfirmChoice.confirm);
  }
}
