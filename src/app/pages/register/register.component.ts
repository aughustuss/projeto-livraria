import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatInputModule} from '@angular/material/input'
import {MatButtonModule} from '@angular/material/button'
import {MatIconModule} from '@angular/material/icon'
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatIconModule, RouterModule],
})
export class RegisterComponent {
  hidePass: boolean = true;
  hideConfirmPass: boolean = true;
}
