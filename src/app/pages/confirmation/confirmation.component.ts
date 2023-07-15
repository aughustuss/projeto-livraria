import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { EmailToConfirm } from 'src/models';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  standalone: true,
  imports: [RouterModule, MatProgressSpinnerModule, CommonModule, MatSnackBarModule, MatButtonModule],
})
export class ConfirmationComponent implements OnInit {
  emailToConfirm: string = "";
  emailToken: string = "";
  emailToConfirmModel = new EmailToConfirm();

  isTokenValid: boolean = true;
  isUserAlreadyVerified: boolean = false;
  resendingConfirmEmail: boolean = false;

  isChecking: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router,
    private snack: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(val => {
      this.emailToConfirm = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken?.replace(/ /g, '+');
    });
    this.api.checkUserIsAlreadyVerified(this.emailToConfirm).subscribe({
      next: (res) => {
        if (res == true) this.isUserAlreadyVerified = true;
        else this.isUserAlreadyVerified = false;
      },
      error: (err) => {
        console.log(err)
      }
    })
    if (!this.isUserAlreadyVerified) {
      this.api.checkConfirmEmailTokenExpiration(this.emailToConfirm).subscribe({
        next: (res) => {
          if (res == false)
            this.isTokenValid = true;
          else this.isTokenValid = false;
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }

    if (!this.isTokenValid && !this.isUserAlreadyVerified) {
      this.emailToConfirmModel.email = this.emailToConfirm;
      this.emailToConfirmModel.emailToken = this.emailToken;
      if (this.emailToConfirmModel.email && this.emailToConfirmModel.emailToken) {
        this.api.confirmUserEmail(this.emailToConfirmModel).subscribe({
          next: (res) => {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 5000);
          },
          error: (err) => {
            console.log(err);
          }
        });
      };
    }
    setTimeout(() => {
      this.isChecking = false;
    }, 2000);
  };


  resendConfirmationEmail() {
    this.api.resendConfirmationEmail(this.emailToConfirm).subscribe({
      next: (res) => {
        this.snack.open("Email reenviado com sucesso", "OK", {
          duration: 5000,
          horizontalPosition: 'center',
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
