import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  public errorMessage: string = "";
  constructor() { }

  getErrorMessage(){
    return this.errorMessage;
  }

  setErrorMessage(errorMsg: string){
    this.errorMessage = errorMsg;
  }
}
