import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { EmailToConfirm } from 'src/models';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  standalone: true,
  imports: [RouterModule],
})
export class ConfirmationComponent implements OnInit {
  emailToConfirm: string = "";
  emailToken: string = "";
  emailToConfirmModel = new EmailToConfirm();
  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }
  ngOnInit(): void {
    this.route.queryParams.subscribe(val => {
      this.emailToConfirm = val['email'];
      let uriToken = val['code'];
      this.emailToken = uriToken?.replace(/ /g, '+');
    });
    this.emailToConfirmModel.email = this.emailToConfirm;
    this.emailToConfirmModel.emailToken = this.emailToken;
    if (this.emailToConfirmModel.email && this.emailToConfirmModel.emailToken) {
      this.api.confirmUserEmail(this.emailToConfirmModel).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
