import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/models';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [MatCardModule]
})
export class ProfileComponent implements OnInit {
  private userId: number = 0;
  public userData: any;
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
    })
    this.api.getUserInfo(this.userId).subscribe({
      next: (res:User) => {
        this.userData = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
