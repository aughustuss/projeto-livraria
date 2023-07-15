import { trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, AbstractControl, FormControl, AbstractControlOptions } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirmPassword';
import ValidateFormFields from 'src/app/helpers/formValidate';
import { ApiService } from 'src/app/services/api/api.service';
import { ResetPassword } from 'src/models';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatButtonModule, MatInputModule, MatIconModule, MatProgressSpinnerModule, CommonModule],
})
export class ResetComponent implements OnInit {
  resetPasswordForm!: FormGroup;

  userEmail: string = "";
  userResetPasswordToken: string = "";

  resetPasswordObj = new ResetPassword;

  isVerifying: boolean = false;
  hideFirstPass: boolean = true;
  hideLastPass: boolean = true;
  isSubmitting: boolean = false;
  isTokenValid: boolean = true;
  resendingPassEmail: boolean = false;
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isVerifying = true;
    this.activatedRoute.queryParams.subscribe(val => {
      this.userEmail = val['email'];
      let uriToken = val['code'];
      this.userResetPasswordToken = uriToken?.replace(/ /g, '+')
    })
    if (this.userEmail) {
      this.api.checkResetPasswordEmailTokenExpiration(this.userEmail).subscribe({
        next: (res) => {
          if(res == false) this.isTokenValid = true;
          else this.isTokenValid = false;
        },
        error: (err) => {
          console.log(err);
        }
      });
      this.isVerifying = false;
    }
    this.resetPasswordForm = this.fb.group({
      FirstPassword: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/)])],
      LastPassword: [null, Validators.required]
    }, {
      validator: ConfirmPasswordValidator('FirstPassword', 'LastPassword')
    } as AbstractControlOptions);
  };

  get FirstPassword(): FormControl {
    return this.resetPasswordForm.get('FirstPassword') as FormControl;
  };

  get LastPassword(): FormControl {
    return this.resetPasswordForm.get('LastPassword') as FormControl;
  }

  getFirstPasswordError() {
    if (this.FirstPassword.hasError('required')) return 'Preencha sua nova senha'
    return this.FirstPassword.hasError('pattern') ? 'Sua senha deve possuir 8 caractéres, 1 letra maiúscula, 1 minúscula, 1 caracter especial e 1 número' : '';
  }

  getLastPasswordError() {
    if (this.LastPassword.hasError('required')) return 'Confirme sua senha';
    return this.LastPassword.hasError('confirmPasswordValidator') ? 'Senhas não conferem' : '';
  }

  onSubmit() {
    if (this.resetPasswordForm.valid) {
      this.isSubmitting = true;
      this.resetPasswordObj.email = this.userEmail;
      this.resetPasswordObj.newPassword = this.resetPasswordForm.get('FirstPassword')?.value;
      this.resetPasswordObj.resetPasswordToken = this.userResetPasswordToken;
      this.resetPasswordObj.confirmPassword = this.resetPasswordForm.get('LastPassword')?.value;
      this.api.resetPassword(this.resetPasswordObj).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.router.navigate(['/login'])
        },
        error: (err) => {
          console.log(err);
          this.isSubmitting = false;
        }
      })
    } else {
      ValidateFormFields.validateAllFormFields(this.resetPasswordForm);
    }
  }

  resendPasswordEmail(){
    this.api.resentResetPasswordEmail(this.userEmail).subscribe({
      next: (res) => {
        this.snack.open("Email reenviado com sucesso.", "OK", {
          duration: 5000,
          horizontalPosition: 'center'
        });
        this.router.navigate(['/home']);        
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
