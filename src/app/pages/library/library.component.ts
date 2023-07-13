import { Component, Input, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Book, BookCategory, Order, User } from 'src/models';
import { ApiService } from 'src/app/services/api/api.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import ValidateFormFields from 'src/app/helpers/formValidate';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component'; 
import { MessagesService } from 'src/app/services/messages/messages.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  standalone: true,
  imports: [MatTabsModule, MatExpansionModule, MatTableModule, MatButtonModule, MatIconModule, MatCardModule, MatFormFieldModule, CommonModule, MatInputModule, MatButtonToggleModule, FormsModule, ReactiveFormsModule, MatSnackBarModule],
})
export class LibraryComponent implements OnInit {
  public returnBookForm!: FormGroup;
  public registerBookForm!: FormGroup;
  public deleteBookForm!: FormGroup;
  

  returnBookFormErrMsg: string = "";
  deleteBookErrMsg: string = "";
  registerBookErrMsg: string = "";
  
  userData: any;
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
  
  userOrders: Book[] = [];
  userOrdersColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'category',
    'subCategory',
    'orderDate',
    'ordered',
  ]
  
  userBooks: Book[] = [];
  userBooksColumns: string[] = [
    'id',
    'title',
    'author',
    'price',
    'ordered',
    'category',
    'subCategory'
  ]

  ordersToDisplay: Order[] = [];
  listOfOrders: Order[] = [];
  allOrdersColumns: string[] = [
    'id',
    'userID',
    'bookID',
    'name',
    'book',
    'date',
    'returned'
  ];
  
  usersToDisplay: User[] = [];
  allUsersColumns: string[] = [
    'id',
    'name',
    'email',
    'mobile',
    'fine',
    'blocked',
    'active',
    'created on',
    'action'
  ]

  constructor(
    private api: ApiService,
    private auth: AuthService,
    private fb: FormBuilder,
    private snack: MatSnackBar,
    public dialog: MatDialog,
    private msg: MessagesService
    ) { }
    
    ngOnInit(): void {
    this.userPayload = this.auth.getUserInfoFromStorage();
    this.userID = this.userPayload?.nameid;
    this.api.getUserInfo(this.userID).subscribe({
      next: (res) => this.userData = res,
      error: (err) => console.log(err)
    });
    this.getAllBooks();
    this.getUserOrders(this.userID);
    this.getUserBooks(this.userID)
    this.getAllOrders();
    this.getAllUsers();
    this.returnBookForm = this.fb.group({
      UserID: ['', Validators.required],
      BookID: ['', Validators.required],
      OrderID: ['', Validators.required]
    });
    this.deleteBookForm = this.fb.group({
      DeletedBookID: ['', Validators.required],
    });

    this.registerBookForm = this.fb.group({
      BookTitle: ['', Validators.compose([Validators.required, Validators.maxLength(40)])],
      BookAuthor: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      BookPrice: ['', Validators.required],
      BookCategory: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
      BookSubCategory: ['', Validators.compose([Validators.required, Validators.maxLength(30)])],
    })
  };

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { bookID: this.DeletedBookID.value, deleteBookErrMsg: this.deleteBookErrMsg},
    });
    dialogRef.afterClosed().subscribe(res => this.deleteBookErrMsg = this.msg.getErrorMessage());
  }
  isAdmin(): boolean{
    return this.userPayload?.role === 'admin'  
  }
  isBlocked() {
    let blocked = this.userData?.blocked;
    return blocked;
  }
  getAllBooks(): void {
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
        if (res.message == 'Sucesso.' || res.message == 'sucesso.') this.getAllBooks();
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  getUserOrders(userID: number) {
    this.api.getUserOrders(userID).subscribe({
      next: (res: Book[]) => {
        this.userOrders = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  getUserBooks(userID: number){
    this.api.getUserBooks(userID).subscribe({
      next: (res: Book[]) => {
        this.userBooks = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getAllOrders() {
    this.api.getAllOrders().subscribe({
      next: (res: Order[]) => {
        this.listOfOrders = res;
        this.ordersToDisplay = this.listOfOrders;
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  filterOrder(filter: string) {
    if (filter === 'allBooks') {
      this.ordersToDisplay = this.listOfOrders.filter((order) => order)
    } else if (filter === 'pendingBooks') {
      this.ordersToDisplay = this.listOfOrders.filter((order) => order.ordered == true)
    } else {
      this.ordersToDisplay = this.listOfOrders.filter((order) => order.ordered == false)
    };
  };

  get UserID(): FormControl {
    return this.returnBookForm.get('UserID') as FormControl
  };

  get BookID(): FormControl {
    return this.returnBookForm.get('BookID') as FormControl
  };

  get OrderID(): FormControl {
    return this.returnBookForm.get('OrderID') as FormControl
  }

  get DeletedBookID(): FormControl {
    return this.deleteBookForm.get('DeletedBookID') as FormControl
  }

  get BookTitle(): FormControl{
    return this.registerBookForm.get('BookTitle') as FormControl
  }

  get BookAuthor(): FormControl {
    return this.registerBookForm.get('BookAuthor') as FormControl
  }

  get BookPrice(): FormControl {
    return this.registerBookForm.get('BookPrice') as FormControl
  }

  get BookCategory(): FormControl {
    return this.registerBookForm.get('BookCategory') as FormControl
  }

  get BookSubCategory(): FormControl {
    return this.registerBookForm.get('BookSubCategory') as FormControl
  }

  getUserIDError() {
    if (this.UserID.hasError('required')) return 'Preencha o ID do usuário'
    return ''
  }

  getBookIDError() {
    if (this.BookID.hasError('required')) return 'Preencha o ID do livro'
    return ''
  };

  getOrderIDError() {
    if (this.OrderID.hasError('required')) return 'Preencha o ID do pedido'
    return ''
  }

  getDeletedBookIDError() {
    if (this.DeletedBookID.hasError('required')) return 'Preencha o ID do livro'
    return ''
  }

  getBookTitleError(){
    if(this.BookTitle.hasError('required')) return 'Preencha o nome do livro'
    return this.BookTitle.hasError('maxLength') ? 'Máximo de 40 caractéres': ''
  }

  getBookAuthorError(){
    if(this.BookAuthor.hasError('required')) return 'Preencha o nome do autor'
    return this.BookAuthor.hasError('maxLength') ? 'Máximod e 50 caractéres' : ''
  }

  getBookPriceError(){
    if(this.BookPrice.hasError('required')) return 'Preencha o preço do livro'
    return ''
  }

  getBookCategoryError(){
    if(this.BookCategory.hasError('required')) return 'Preencha a categoria do livro'
    return this.BookCategory.hasError('maxLength') ? 'Máximo de 30 caractéres' : ''
  }

  getBookSubCategoryError(){
    if(this.BookSubCategory.hasError('required')) return 'Preencha a subcategoria do livro'
    return this.BookSubCategory.hasError('maxLength') ? 'Máximo de 30 caractéres' : ''
  }

  onSubmit() {
    if (this.returnBookForm.valid) {
      this.api.returnBook(this.UserID.value, this.BookID.value, this.OrderID.value).subscribe({
        next: (res) => {
          this.snack.open("Livro devolvido.", "OK", {
            duration: 5000,
            horizontalPosition: 'center'
          })
        },
        error: (err) => {
          this.returnBookFormErrMsg = err.error.message;
        }
      })
    } else {
      ValidateFormFields.validateAllFormFields(this.returnBookForm)
    };
  };

  getAllUsers() {
    this.api.getAllUsers().subscribe({
      next: (res) => {
        this.usersToDisplay = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  };
  registerBook(){
    if(this.registerBookForm.valid){
      let bookObj: Book = {
        id: 0,
        title: this.registerBookForm.get('BookTitle')?.value,
        category: this.registerBookForm.get('BookCategory')?.value,
        subCategory: this.registerBookForm.get('BookSubCategory')?.value,
        price: this.registerBookForm.get('BookPrice')?.value,
        available: true,
        count: 1,
        author: this.registerBookForm.get('BookAuthor')?.value,
      };
      this.api.registerBook(bookObj, this.userID).subscribe({
        next: (res) => {
          this.snack.open("Livro cadastrado com sucesso.", "OK", {
            duration: 5000,
            horizontalPosition: 'center',
          });
          this.registerBookForm.reset();
        },
        error: (err) => {
          this.registerBookErrMsg = err.error.message;
        }
      })
    } else {
      ValidateFormFields.validateAllFormFields(this.registerBookForm);
    }
  }
  blockUser(user: User) {
    if (user.blocked) {
      this.api.unblockUser(user.id).subscribe({
        next: (res) => {
          if (res.message == 'Desbloqueado') user.blocked == false;
          this.getAllUsers();
          this.getAllBooks();
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      this.api.blockUser(user.id).subscribe({
        next: (res) => {
          if (res.message == 'Bloqueado') user.blocked == true;
          this.getAllUsers();
          this.getAllBooks();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  };

};
