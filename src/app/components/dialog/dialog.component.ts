import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api/api.service';
import { MessagesService } from 'src/app/services/messages/messages.service';
import { DialogData } from 'src/models';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
})
export class DialogComponent {
  constructor(
    private dialogRef: MatDialogRef<DialogComponent>,
    private api: ApiService,
    private msg: MessagesService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }
  onClose(): void {
    this.dialogRef.close();
  }

  deleteBook(bookID: number){
      if (bookID) {
        this.api.deleteBookByID(this.data.bookID).subscribe({
          next: (response) => {
            console.log(response);
            this.dialogRef.close();
          },
          error: (err) => {
            this.msg.setErrorMessage(err.error.message);
            this.dialogRef.close();
          }
        })
      }
  }
}
