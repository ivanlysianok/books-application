import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { saleStatus } from '../../constants/sale-status.constant';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';
import { NotificationService } from '../../shared/services/error.service';
import { LoaderService } from '../../shared/services/loader.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  public volume: Volume | null = null;
  public isForSale = false;

  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private loaderService: LoaderService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    const volumeId = this.route.snapshot.paramMap.get('id');
    if (volumeId) {
      this.loaderService.start();
      this.booksService.getBookById(volumeId).subscribe({
        next: (response) => {
          this.volume = response;
          console.log(this.volume)
          if (this.volume.saleInfo.saleability) {
            this.isForSale =
              this.volume.saleInfo.saleability === saleStatus.forSale
                ? true
                : false;
          }
          this.loaderService.stop();
        },
        error: (err) => {
          this.notificationService.error(err);
          this.loaderService.stop();
        },
      });
    }
  }
}
