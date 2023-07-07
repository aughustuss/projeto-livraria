import { Component, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatSidenavModule} from '@angular/material/sidenav'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button'
import {MatMenuModule} from '@angular/material/menu'
import {MatListModule} from '@angular/material/list'
import { CommonModule } from '@angular/common';
import { NavItem } from 'src/models';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatButtonModule, MatMenuModule, CommonModule, MatListModule],
})
export class HeaderComponent {
  isToggled: boolean = false;
  
  toggleSidenav(){
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
