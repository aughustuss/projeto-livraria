import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import ValidateFormFields from 'src/app/helpers/formValidate';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-send-reset',
  templateUrl: './send-reset.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, MatButtonModule, MatFormFieldModule, CommonModule, MatInputModule, MatProgressSpinnerModule, MatSnackBarModule],
})
export class SendResetComponent implements OnInit{
  sendResetPasswordForm!: FormGroup;

  isSubmitting: boolean = false;
  sendResetPasswordEmailErrMsg: string = "";
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    private route: Router
  ){}

  ngOnInit(): void {
    this.sendResetPasswordForm = this.fb.group({
      ResetEmail: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
    })
  }

  get ResetEmail(): FormControl{
    return this.sendResetPasswordForm.get('ResetEmail') as FormControl;
  }

  getResetEmailError(){
    if(this.ResetEmail.hasError('required')) return 'Preencha o seu email'
    return this.ResetEmail.hasError('pattern') ? 'Email inválido' : ''
  }

  onSubmit(){
    if(this.sendResetPasswordForm.valid){
      this.isSubmitting = true;
      this.api.sendResetPasswordEmail(this.sendResetPasswordForm.get('ResetEmail')?.value).subscribe({
        next: (res) => {
          this.isSubmitting = false;
          this.snack.open("Email enviado com sucesso.", "OK", {
            duration:5000,
            horizontalPosition: 'center',
          });
          this.sendResetPasswordForm.reset();
          this.route.navigate(['/home']);
        },
        error: (err) => {
          this.sendResetPasswordEmailErrMsg = err?.error?.message;
          this.isSubmitting = false;
        }
      })
    } else {
      ValidateFormFields.validateAllFormFields(this.sendResetPasswordForm)
    }
  }

}
