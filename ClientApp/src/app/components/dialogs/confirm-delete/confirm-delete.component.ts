import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'confirm-delete',
  templateUrl: 'confirm-delete.component.html'
})
export class ConfirmDeleteComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmDeleteComponent>) { }

  public closeDialog() {
    this.dialogRef.close(false);
  }

  public confirmDeletion() {
    this.dialogRef.close(true);
  }
}
