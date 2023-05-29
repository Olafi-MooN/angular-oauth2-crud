import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  UntypedFormControl,
} from '@angular/forms';
import { tap, delay, finalize, catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { AuthService } from '../../../../core/service/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnDestroy {
  public error: string = '';
  public isLoading: boolean = false;
  public loginForm: UntypedFormGroup = {} as UntypedFormGroup;

  private sub = new Subscription();

  constructor(private router: Router, private authService: AuthService) {
    this.buildForm();
  }

  get f() {
    return this.loginForm.controls;
  }

  async login() {
    this.isLoading = true;
    const credentials = this.loginForm.value;
    const auth = await this.authService.authenticate(credentials);
    if (auth?.access_token) {
      this.router.navigate(['/application/home']);
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private buildForm(): void {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(''),
      password: new UntypedFormControl(''),
    });
  }
}
