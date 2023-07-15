import { Component, OnInit } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'projeto-livraria';
  isToggled: boolean = false;
  isSemiToggled: boolean = true;
  showHeader: boolean = true;
  showFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.checkPath(val.url);
      }
    });
  }

  checkPath(url: string) {

    if (url.startsWith('/login') || url.startsWith('/register') || url.startsWith('/confirmAccount') || 
    url.startsWith('/resetPassword') || url.startsWith('/sendReset')) {
      this.showHeader = false;
      this.showFooter = false;
    } else {
      this.showHeader = true;
      this.showFooter = true;
    }
  }
  toggleSideNav() {
    this.isToggled = !this.isToggled;
  }

}
