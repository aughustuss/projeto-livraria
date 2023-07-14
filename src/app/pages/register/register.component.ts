import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators, FormControl, AbstractControlOptions} from '@angular/forms'

import { Router, RouterModule } from '@angular/router';
import { ConfirmPasswordValidator } from 'src/app/helpers/confirmPassword';
import { CommonModule } from '@angular/common';
import ValidateFormFields from 'src/app/helpers/formValidate';
import { User } from 'src/models';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule, CommonModule, MatSnackBarModule, MatProgressSpinnerModule],
})
export class RegisterComponent implements OnInit {
  hidePass: boolean = true;
  hideConfirmPass: boolean = true;
  public registerForm!: FormGroup;
  registerFormErrMsg: string = "";
  isRegistering: boolean = false;
  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private snack: MatSnackBar,
    private route: Router
    ){}

  ngOnInit():void {
    this.registerForm = this.fb.group({
      FirstName: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      LastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      Email: ['', Validators.compose([Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)])],
      Password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/)])],
      ConfirmPassword: [null, Validators.required]
    }, {
      validator: ConfirmPasswordValidator("Password", "ConfirmPassword")
    } as AbstractControlOptions)
  };

  getFirstNameError(){
    if(this.FirstName.hasError('required')) return 'Preencha seu primeiro nome';
    return '';
  }

  getLastNameError(){
    if(this.LastName.hasError('required')) return 'Preencha seu ultimo nome';
    return '';
  }

  getEmailError(){
    if(this.Email.hasError('required')) return 'Preencha seu email';
    return this.Email.hasError('pattern') ? 'Email inválido' : '';
  }

  getPasswordError(){
    if(this.Password.hasError('required')) return 'Preencha sua senha';
    return this.Password.hasError('pattern') ? 'Sua senha deve possuir 8 caractéres, 1 letra maiúscula, 1 minúscula, 1 caracter especial e 1 número' : '';
  }

  getConfirmPasswordError(){
    if(this.ConfirmPassword.hasError('required')) return 'Confirme sua senha';
    return this.ConfirmPassword.hasError('confirmPasswordValidator') ? 'Senhas não conferem' : '';
  }

  get FirstName(): FormControl {
    return this.registerForm.get('FirstName') as FormControl;
  }
  get LastName(): FormControl {
    return this.registerForm.get('LastName') as FormControl;
  }
  get Email(): FormControl {
    return this.registerForm.get('Email') as FormControl;
  }
  get Password(): FormControl {
    return this.registerForm.get('Password') as FormControl;
  }

  get ConfirmPassword(): FormControl {
    return this.registerForm.get('ConfirmPassword') as FormControl;
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.isRegistering = true;
      let userObj: User = {
        id: 0,
        firstName: this.registerForm.get('FirstName')?.value,
        lastName: this.registerForm.get("LastName")?.value,
        email: this.registerForm.get("Email")?.value,
        userRole: 'user',
        mobile: '',
        password: this.registerForm.get("Password")?.value,
        blocked: false,
        active: false,
        createdOn: new Date(),
        fine: 0,
      };
      this.api.register(userObj).subscribe({
        next: (res => {
          this.snack.open('Conta criada com sucesso.', 'Ok', {
            duration: 5000,
            horizontalPosition: 'center',
          })
          this.isRegistering = false;
          this.registerForm.reset();
          this.route.navigate(['/login']);
        }),
        error: (err) => {
          this.registerFormErrMsg = err?.error?.message;
        }
      })
    } else {
      ValidateFormFields.validateAllFormFields(this.registerForm)
    }
  }
}
