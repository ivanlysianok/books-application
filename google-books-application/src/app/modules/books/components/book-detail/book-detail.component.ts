import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  public volumeId: string | null = null;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService
  ) {}
  ngOnInit(): void {
    this.volumeId = this.route.snapshot.paramMap.get('id');
    // if (this.volumeId) {
    //   this.booksService.getBookById(this.volumeId).subscribe((response) => {
    //     console.log(response);
    //   });
    // }
  }
}
