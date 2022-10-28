import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Volume } from '../../../../models/volume.interface';
import { BooksService } from '../../../../services/books.service';
import { ErrorService } from '../../../../../../shared/services/error.service';
import { LoaderService } from '../../../../../../shared/services/loader.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  protected volume: Volume | null = null;
  protected forSaleIdentifier = 'FOR_SALE';

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (!bookId) {
      return;
    }

    this.loaderService.start();
    this.booksService.getBook(bookId).subscribe({
      next: (response) => {
        this.volume = response;
        this.loaderService.stop();
      },
      error: (err) => {
        this.errorService.error(err);
        this.loaderService.stop();
      },
    });
  }
}
