import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  public isLoading = false;
  /**
   * Destroy ref to unsubscribing from observables
   */
  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoadingSubscription();
  }

  private isLoadingSubscription(): void {
    this.loaderService.isLoading$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((response: boolean | null) => {
        if (response === null) {
          return;
        }
        this.isLoading = response;
      });
  }
}
