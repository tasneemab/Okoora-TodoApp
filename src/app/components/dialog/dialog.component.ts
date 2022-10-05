import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
})
export class DialogComponent implements OnInit {
  /**
   * var to store new task value
   */
  task: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private snackbarService: SnackBarService,

  ) { }

  ngOnInit(): void {
  }

  /**
   * choose code for the document / voucher
   */
  addTask() {
    if (!this.task) {
      return this.snackbarService.fieldsRequired();

    }
    this.dialogRef.close(this.task);
  }

}
