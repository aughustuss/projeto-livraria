import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatMenuModule, CommonModule, MatListModule],
})
export class HeaderComponent {
  isToggled: boolean = false;
  @Output() sideNavToggled = new EventEmitter<boolean>();

  toggleSidenav(){
    this.isToggled = !this.isToggled;
  }

}
