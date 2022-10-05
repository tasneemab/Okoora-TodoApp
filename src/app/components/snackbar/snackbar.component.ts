import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { Direction } from '@angular/cdk/bidi';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  durationInSeconds = 3 * 1000; //period to show snackbar
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  panelErrorClasses: string[] = ['snackbar-error', 'snackbar-message']; // message body color red
  panelSuccessClasses: string[] = ['snackbar-success', 'snackbar-message']; // message body color green

  constructor(
    private _snackBar: MatSnackBar,
  ) { }

  /**
   * show added to favourite success msg
   */
  addToFav() {
    let message = 'Task has been added successfully';
    this.openSnackBar(message, this.panelSuccessClasses);
  }

  /**
   * show try again error message
   */
  deleteSucceeded() {
    let message = 'Task has been deleted successfully';
    this.openSnackBar(message, this.panelSuccessClasses);
  }

  /**
   * show fields required error message
   */
  fieldsRequired() {
    let message = 'Fields Required';
    this.openSnackBar(message, this.panelErrorClasses);
  }

  /**
   * show not found error message
   */
  incorrectUsernameEmail() {
    let message = 'Incorrect Username or Password';
    this.openSnackBar(message, this.panelErrorClasses);
  }

  /**
   * show login successfuly
   */
  logedinSucceeded() {
    let message = 'You have loged in successfully';
    this.openSnackBar(message, this.panelSuccessClasses);
  }

  /**
   * show not found error message
   */
  notFound() {
    let message = 'Task not found';
    this.openSnackBar(message, this.panelErrorClasses);
  }

  /**
   * show try again error message
   */
  saveSucceeded() {
    let message = 'Task has been added successfully';
    this.openSnackBar(message, this.panelSuccessClasses);
  }

  /**
   * showtry again error message. http response
   */
  tryAgain() {
    let message = 'Try Again';
    this.openSnackBar(message, this.panelErrorClasses);
  }

  private openSnackBar(message: string, panelClass: string[]) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds,
      panelClass: panelClass,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      direction: 'ltr',
    });
  }
}
