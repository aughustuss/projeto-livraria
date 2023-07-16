import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment'; 
import { Book, EmailToConfirm, ResetPassword, User } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  register(user: User){
    return this.http.post<any>(`${this.baseUrl}User/register`, user);
  }

  registerBook(book: Book, userID: number){
    return this.http.post<any>(`${this.baseUrl}Books/${userID}/create`, book)
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
  getUserBooks(userID: number){
    return this.http.get<any>(`${this.baseUrl}Books/userBooks/${userID}`);
  }
  getUserOrders(userID: number){
    return this.http.get<any>(`${this.baseUrl}Order/userOrders/${userID}`);
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

  enableUser(userID: number){
    return this.http.put<any>(`${this.baseUrl}User/enableUser/${userID}`, {});
  };

  disableUser(userID: number){
    return this.http.put<any>(`${this.baseUrl}User/disableUser/${userID}`, {});
  }

  deleteBookByID(bookID: number){
    return this.http.delete<any>(`${this.baseUrl}Books/deleteBook/${bookID}`);
  }

  confirmUserEmail(emailToConfirmObj: EmailToConfirm){
    return this.http.post<any>(`${this.baseUrl}User/confirm-email`, emailToConfirmObj)
  }

  sendResetPasswordEmail(email: string){
    return this.http.post<any>(`${this.baseUrl}User/send-reset-password/${email}`,{})
  };

  resetPassword(resetPasswordObj: ResetPassword){
    return this.http.post<any>(`${this.baseUrl}User/reset-password`, resetPasswordObj);
  }

  checkConfirmEmailTokenExpiration(email: string){
    return this.http.get<any>(`${this.baseUrl}User/check-confirm-email-token-validity/${email}`);
  }

  checkResetPasswordEmailTokenExpiration(email: string){
    return this.http.get<any>(`${this.baseUrl}User/check-reset-password-token-validity/${email}`)
  }

  resendResetPasswordEmail(email: string){
    return this.http.post<any>(`${this.baseUrl}User/resend-reset-password/${email}`, {});
  }

  resendConfirmationEmail(email: string){
    return this.http.post<any>(`${this.baseUrl}User/resend-confirmation-email/${email}`, {});
  }

  checkUserIsAlreadyVerified(email: string){
    return this.http.get<any>(`${this.baseUrl}User/check-is-already-verified/${email}`);
  }
}
