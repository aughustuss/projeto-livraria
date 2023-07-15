import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';
import { Characteristics, Details } from 'src/models';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterModule],
})
export class HomeComponent {
  advantages: Characteristics[] = [
    {
      title: 'Velocidade',
      content: 'Economize tempo organizando seus itens.',
      icon: 'timelapse'
    },
    {
      title: 'Organização',
      content: 'Mantenha seus itens perfeitamente organizados para facilitar o acesso. ',
      icon: 'table_chart',
    },
    {
      title: 'Segurança',
      content: 'Tenha tranquilidade com o controle de pedidos e acesso à livraria. Seu pedido estará seguro.',
      icon: 'security',
    }
  ]

  funcionalities: Characteristics[] = [
    {
      title: 'Realize o pedido de um novo livro',
      content: 'Peça um dos livros disponíveis e o retire na nossa livraria física.',
      icon: 'library_add'
    },
    {
      title: 'Busque por um livro ou autor específico',
      content: "Encontre o livro do seu autor preferido ou então filtre por palavras chaves.",
      icon: 'search'
    },
    {
      title: 'Veja os seus pedidos',
      content: "Tenha acesso à todos os seus pedidos realizados. Visualize o valor da sua multa (se houver), data para devolução e mais.",
      icon: 'collections_bookmark',
    }
  ];

  details: Details[] = [
    {
      number: '1k+',
      subtitle: 'Clientes'
    },
    {
      number: '5k+',
      subtitle: 'Livros'
    },
    {
      number: '500+',
      subtitle: 'Pedidos mensalmente'
    },
    {
      number: '10k+',
      subtitle: 'Movimentações'
    }
  ]
  constructor(){}
}
