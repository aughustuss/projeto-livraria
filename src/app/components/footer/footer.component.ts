import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  standalone: true,
  imports: [RouterModule, MatIconModule, CommonModule]
})
export class FooterComponent implements OnInit {
  userPayload: any;
  id: number = 0;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.userPayload = this.auth.getUserInfoFromStorage();
    this.id = this.userPayload?.nameid;
  }

  isAdmin(): boolean {
    return this.userPayload?.role === 'admin'
  }

  isLoggedIn() {
    return this.auth.isLoggedIn();
  }
}
