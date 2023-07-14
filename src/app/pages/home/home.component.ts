import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { Advantages } from 'src/models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterModule],
})
export class HomeComponent {
  advantages: Advantages[] = [
    {
      title: 'Velocidade',
      content: 'Economize tempo organizando seus itens',
      icon: 'timelapse'
    },
    {
      title: 'Organização',
      content: 'Mantenha seus itens perfeitamente organizados para facilitar o acesso. ',
      icon: 'table_chart',
    },
    {
      title: 'Segurança',
      content: 'Tenha tranquilidade com o controle de acesso e atividades na sua livraria.',
      icon: 'security',
    }
  ]
  constructor(){}
}
