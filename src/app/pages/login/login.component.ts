import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import ValidateFormFields from 'src/app/helpers/formValidate';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, MatProgressSpinnerModule],
})
export class LoginComponent implements OnInit {
  hidePass: boolean = true;
  isLogginIn: boolean = false;

  public loginForm!: FormGroup
  loginErrorMsg: string = "";
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private api: ApiService,
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['', Validators.required],
      Password: ['', Validators.required]
    });
  };

  getEmailError() {
    if (this.Email.hasError('required')) return 'Preencha seu email'
    return ''
  }

  getPasswordError() {
    if (this.Password.hasError('required')) return 'Preencha a sua senha'
    return ''
  }

  get Email(): FormControl {
    return this.loginForm.get('Email') as FormControl
  }

  get Password(): FormControl {
    return this.loginForm.get('Password') as FormControl
  };

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLogginIn = true;
      this.api.login(this.loginForm.value).subscribe({
        next: (res => {
          const accessToken = res.accessToken;
          if (accessToken) this.auth.setUserToSessionStorage(accessToken);
          const userPayload = this.auth.getUserInfoFromToken();
          localStorage.setItem("userPayload", JSON.stringify(userPayload));
          console.log(userPayload);
          this.isLogginIn = false;
          this.route.navigate(['']);
        }),
        error: (err) => {
          this.isLogginIn = false;
          this.loginErrorMsg = err.error.message;
        }
      })
    } else {
      ValidateFormFields.validateAllFormFields(this.loginForm);
    }
  }

}
