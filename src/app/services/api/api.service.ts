import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post<any>(`${this.baseUrl}User/register`, user);
  }

  login(user: any){
    return this.http.post<any>(`${this.baseUrl}User/authenticate`, user);
  }

  getUserInfo(id: number){
    return this.http.get<any>(`${this.baseUrl}User/getinfo/${id}`);
  }

  getAllBooks(){
    return this.http.get<any>(`${this.baseUrl}Books/books`);
  }

  orderBook(userID: number, bookID: number){
    return this.http.post<any>(`${this.baseUrl}Order/createOrder/${userID}/${bookID}`,{});
  }

  getUserOrders(userID: number){
    return this.http.get<any>(`${this.baseUrl}Books/userBooks/${userID}`);
  };

  getAllOrders(){
    return this.http.get<any>(`${this.baseUrl}Order/getOrders`);
  };

  returnBook(userID: number, bookID: number, orderID: number,){
    return this.http.put<any>(`${this.baseUrl}Books/returnBook/${userID}/${bookID}/${orderID}`, {});
  }

  getAllUsers(){
    return this.http.get<any[]>(`${this.baseUrl}User/users`);
  }

  blockUser(userID: number){
    return this.http.put<any>(`${this.baseUrl}User/blockUser/${userID}`, {});
  };
  
  unblockUser(userID: number){
    return this.http.put<any>(`${this.baseUrl}User/unblockUser/${userID}`, {});
  }

  enableUser(id: number){

  };

  deleteBookByID(bookID: number){
    return this.http.delete<any>(`${this.baseUrl}Books/deleteBook/${bookID}`);
  }
}
