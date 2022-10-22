import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private loadingSub = new Subscription();

  constructor(private loaderService: LoaderService) {}

  ngOnInit(): void {
    this.isLoadingSubscription();
  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }

  isLoadingSubscription(): void {
    this.loadingSub = this.loaderService.isLoading$.subscribe(
      (response: boolean | null) => {
        if (response === null) {
          return;
        }
        this.isLoading = response;
      }
    );
  }
}
