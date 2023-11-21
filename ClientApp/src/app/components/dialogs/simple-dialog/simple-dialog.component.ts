import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { lastValueFrom } from "rxjs";

@Component({
  selector: 'simple-dialog',
  templateUrl: 'simple-dialog.component.html'
})
export class SimpleDialogComponent {
  public ask: string = '';
  public header: string = 'Confirm';

  constructor(private dialogRef: MatDialogRef<SimpleDialogComponent>) { }

  public rejectAsk() {
    this.dialogRef.close(false);
  }

  public approveAsk() {
    this.dialogRef.close(true);
  }


  async askAsync(ask: string, header: string = "Confirm") {
    this.ask = ask;
    this.header = header;
    await lastValueFrom(this.dialogRef.afterClosed());
  }
}
