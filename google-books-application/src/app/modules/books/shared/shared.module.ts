import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationService } from './services/error.service';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [LoaderComponent],
  imports: [CommonModule],
  exports: [LoaderComponent],
  providers: [LoaderService, NotificationService]
})
export class SharedModule {}
