import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { User } from 'src/models';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [MatCardModule, CommonModule, MatProgressSpinnerModule]
})
export class ProfileComponent implements OnInit {
  isLoadingData: boolean = false;
  private userId: number = 0;
  public userData: any;
  constructor(
    private api: ApiService,
    private activatedRoute: ActivatedRoute,

  ) { }

  ngOnInit(): void {
    this.isLoadingData = true;
    this.activatedRoute.params.subscribe(val => {
      this.userId = val['id'];
    })
    this.api.getUserInfo(this.userId).subscribe({
      next: (res: User) => {
        if (res) this.userData = res;
        this.isLoadingData = false;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
