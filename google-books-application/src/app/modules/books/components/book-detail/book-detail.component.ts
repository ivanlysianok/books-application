import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorHeader } from '../../constants/error-headers.constant';
import { Volume } from '../../models/volumes.interface';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  public volumeId: string | null = null;
  public volume: Volume | null = null;
  public isLoading = false;
  constructor(
    private route: ActivatedRoute,
    private booksService: BooksService,
    private toastrService: ToastrService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.volumeId = this.route.snapshot.paramMap.get('id');
    if (this.volumeId) {
      this.isLoading = true;
      this.booksService.getBookById(this.volumeId).subscribe({
        next: (response) => {
          this.volume = response;
          this.isLoading = false;
        },
        error: (err) => {
          this.toastrService.error(err.error.error.message, ErrorHeader.error)
          this.isLoading = false;
        },
      });
    }
  }

  navigateBack(): void {
    this.router.navigate(['../../'], { relativeTo: this.route });
  }
}
