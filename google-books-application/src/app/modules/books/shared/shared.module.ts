import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DisplayListItems } from './components/display-list-items/display-list-items.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationService } from './services/error.service';
import { LoaderService } from './services/loader.service';
import { VolumeCoverComponent } from './components/volume-cover/volume-cover.component';

@NgModule({
  declarations: [LoaderComponent, DisplayListItems, VolumeCoverComponent],
  imports: [CommonModule],
  exports: [LoaderComponent, DisplayListItems, VolumeCoverComponent],
  providers: [LoaderService, NotificationService],
})
export class SharedModule {}
