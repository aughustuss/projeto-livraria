import { Component, OnInit, HostListener} from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';
import { NavItem } from 'src/models';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatMenuModule, CommonModule, MatListModule],
})
export class HeaderComponent implements OnInit {
  isToggled: boolean = false;
  windowSize: number = 0;
  @HostListener('window:resize', ['$event'])
  onWindowResize(event: any):void{
    this.windowSize = event.target.innerWidth;
  };
  public id: number = 0;
  public userPayload?: any;
  constructor(
    private auth: AuthService,
    private api: ApiService
    ){}
    
    ngOnInit(): void {
      this.userPayload = this.auth.getUserInfoFromStorage();
      this.id = this.userPayload?.nameid;
      this.windowSize = window.innerWidth;
    }
    
    toggleSidenav(){
    this.isToggled = !this.isToggled;
  }

  isLoggedIn(){
    return this.auth.isLoggedIn();
  }

  signOut(){
    this.auth.signOut();
  }

}
