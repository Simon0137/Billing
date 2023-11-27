import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { lastValueFrom } from "rxjs";

export interface SimpleDialogData {
  message: string;
  title?: string;
}

@Component({
  selector: 'simple-dialog',
  templateUrl: 'simple-dialog.component.html'
})
export class SimpleDialogComponent {

  constructor(private dialogRef: MatDialogRef<SimpleDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: SimpleDialogData) {
    data = data || {};
    data.message = data.message || 'Choose something';
    data.title = data.title || 'Confirm';
  }

  public rejectAsk() {
    this.dialogRef.close(false);
  }

  public approveAsk() {
    this.dialogRef.close(true);
  }
}
