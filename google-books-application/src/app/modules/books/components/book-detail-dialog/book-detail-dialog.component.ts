import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { VolumeInfo } from '../../models/volumeInfo/volume-info.interface';

@Component({
  selector: 'app-book-detail-dialog',
  templateUrl: './book-detail-dialog.component.html',
})
export class BookDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<BookDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: VolumeInfo | null = null
  ) {}

  onCloseDialog(): void {
    this.dialogRef.close();
  }
}
