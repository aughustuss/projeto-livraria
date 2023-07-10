import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Book, BookCategory, Order } from 'src/models';
import { ApiService } from 'src/app/services/api/api.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  standalone: true,
  imports: [MatTabsModule, MatExpansionModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, CommonModule, MatInputModule],
})
export class LibraryComponent implements OnInit {
  availableBooks: Book[] = [];
  bookCategoriesToDisplay: BookCategory[] = [];
  userPayload: any;
  userID: number = 0;
  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'available',
    'order'
  ]

  userOrdersColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'ordered'
  ]

  userOrders: Book[] = [];

  ordersToDisplay: Order[] = [];
  listOfOrders: Order[] = [];
  allOrdersColumns: string[] = [
    'id',
    'userID',
    'name',
    'bookID',
    'book',
    'date',
    'returned'
  ]

  constructor(
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllBooks();
    this.userPayload = this.auth.getUserInfoFromStorage();
    this.userID = this.userPayload?.nameid;
    this.getUserOrders(this.userID);

  };

  getAllBooks(): void{
    this.api.getAllBooks().subscribe({
      next: (res: Book[]) => {
        this.availableBooks = [];
        for (let book of res) this.availableBooks.push(book);
        this.updateList();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateList() {
    this.bookCategoriesToDisplay = [];
    for (let book of this.availableBooks) {
      let exist = false;
      for (let categoryBooks of this.bookCategoriesToDisplay) {
        if (book.category == categoryBooks.category && book.subCategory == categoryBooks.subCategory) exist = true;
      }
      if (exist) {
        for (let categoryBooks of this.bookCategoriesToDisplay) {
          if (book.category == categoryBooks.category && book.subCategory == categoryBooks.subCategory) categoryBooks.books?.push(book);
        }
      } else {
        this.bookCategoriesToDisplay.push({
          category: book.category,
          subCategory: book.subCategory,
          books: [book],
        })
      }
    }
  }
  getBookCount() {
    return this.bookCategoriesToDisplay.reduce((red, count) => count.books.length + red, 0);
  }
  search(val: string) {
    val = val.toLowerCase();
    this.updateList();
    if (val.length > 0) {
      this.bookCategoriesToDisplay = this.bookCategoriesToDisplay.filter((cat) => {
        cat.books = cat.books.filter((book) => {
          return book.title.toLowerCase().includes(val) || book.author.toLowerCase().includes(val);
        })
        return cat.books.length > 0;
      });
    };
  };

  orderBook(userID: number, bookID: number) {
    this.api.orderBook(userID, bookID).subscribe({
      next: (res) => {
        console.log(res);
        if(res.message == 'Sucesso.' || res.message == 'sucesso.') this.getAllBooks();
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  getUserOrders(userID: number){
    this.api.getUserOrders(userID).subscribe({
      next: (res: Book[]) => {
        this.userOrders = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  getAllOrders(){
    this.api.getAllOrders().subscribe({
      next: (res:Order[]) => {
        this.listOfOrders = res;
        this.ordersToDisplay = this.listOfOrders;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
