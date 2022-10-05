import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SnackBarService } from 'src/app/components/snackbar/snackbar.component';
import { UserService } from '../../api/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  // login data
  credentials: any = {
    username: '',
    email: '',
  };


  // initialize login form with validation
  loginForm: FormGroup = new FormGroup({
    'username': new FormControl(this.credentials.username, [Validators.required,]),
    'email': new FormControl(this.credentials.email, [Validators.required,]),
  });

  // user trying to sign in. show/hide login button, progress spinner
  signingIn: boolean = false;

  constructor(
    private router: Router,
    private api: UserService,
    private snackbarService: SnackBarService,
  ) { }

  ngOnInit(): void {
  }

  /**
   * handles login form submission
   *
   * @param {object} data login credentials
   */
  onSubmit(data: any) {
    // checks if all fields are filled
    if (!this.loginForm.valid) {
      this.snackbarService.fieldsRequired();
    }
    if (this.loginForm.valid) {
      // hide button, show spinner
      this.signingIn = true;
      setTimeout(() => {
        // authenticate user in backend
        this.api.login(data).subscribe((res: any) => {
          this.snackbarService.logedinSucceeded();
          localStorage.setItem('user_id', res.id);
          this.router.navigate(['dashboard'], { replaceUrl: true });
        }, (_error: any) => {
          this.snackbarService.incorrectUsernameEmail();
        });
      }, 300);
    }
  }

}
