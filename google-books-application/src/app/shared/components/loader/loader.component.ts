import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private destroySub$ = new Subject<void>();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoadingSubscription();
  }

  ngOnDestroy(): void {
    this.destroySub$.next();
    this.destroySub$.unsubscribe();
  }

  private isLoadingSubscription(): void {
    this.loaderService.isLoading$
      .pipe(takeUntil(this.destroySub$))
      .subscribe((response: boolean | null) => {
        if (response === null) {
          return;
        }
        this.isLoading = response;
      });
  }
}
