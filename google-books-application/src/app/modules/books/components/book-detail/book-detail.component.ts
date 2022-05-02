import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saleStatus } from '../../constants/sale-status.constant';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';
import { ErrorService } from 'src/app/shared/services/error.service';
import { LoaderService } from 'src/app/shared/services/loader.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  public volume: Volume | null = null;
  public saleStatus = saleStatus;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private loaderService: LoaderService,
    private errorService: ErrorService
  ) {}

  ngOnInit(): void {
    const volumeId = this.route.snapshot.paramMap.get('id');
    if (volumeId) {
      this.loaderService.start();
      this.booksService.getBookById(volumeId).subscribe({
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

  onLinkOpen(link?: string): void {
    if (link) {
      window.location.href = link;
    }
  }
}
