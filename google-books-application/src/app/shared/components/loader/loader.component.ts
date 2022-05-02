import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  public isLoading = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.loading.subscribe((response: boolean) => {
      this.isLoading = response;
    })
  }
}
