import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
