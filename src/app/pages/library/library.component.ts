import { Component, OnInit } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Book } from 'src/models';
import { ApiService } from 'src/app/services/api/api.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  standalone: true,
  imports: [MatTabsModule, MatExpansionModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule],
})
export class LibraryComponent implements OnInit {
  availableBooks: Book[] = [];
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order'
  ]

  constructor(
    private api: ApiService
  ){}

  ngOnInit(): void {
    this.api.getAllBooks().subscribe({
      next: (res => {
        this.availableBooks = [];
        console.log(res);
      }),
      error: (err) => {
        console.log(err);
      }
    })
  }

}
