import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NavItem } from 'src/models';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'projeto-livraria';
  isToggled: boolean = false;
  isSemiToggled: boolean = true;
  showSideNav: boolean = true;
  showHeader: boolean = true;
  showFooter: boolean = true;
  constructor(private router: Router){
    router.events.subscribe(val => {
      if(val instanceof NavigationEnd){
        if(val.url === '' || val.url === '/home' || val.url === '/login' || val.url === '/register'){
          this.showSideNav = false;
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showSideNav = true;
          this.showHeader = true;
          this.showFooter = true;
        }
      }
    })
  }

  toggleSideNav(){
    this.isToggled = !this.isToggled;
  }

  navItems: NavItem[] = [
    {
      title: "Ver Livros",
      link: "/books",
      icon: "book",
    },
    {
      title: "Gerenciar Livros",
      link: "",
      icon: "bookmark",
    },
    {
      title: "Gerenciar Categorias",
      link: "",
      icon: "settings"
    },
    {
      title: "Retornar Livro",
      link: "",
      icon: "assignment_return",
    },
    {
      title: "Gerenciar usuários",
      link: "",
      icon: "supervised_user_circle"
    },
    {
      title: "Todos os pedidos",
      link: "",
      icon: "folder"
    },
    {
      title: "Meus pedidos",
      link: "",
      icon: "folder_shared"
    },
  ]

}
