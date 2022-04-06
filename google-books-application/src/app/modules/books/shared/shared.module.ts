import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NotificationService } from './services/error.service';
import { LoaderService } from './services/loader.service';
import { VolumeCoverComponent } from './components/volume-cover/volume-cover.component';
import { DisplayVolumeItem } from './components/display-volume-item/display-volume-item.component';

@NgModule({
  declarations: [LoaderComponent, VolumeCoverComponent, DisplayVolumeItem],
  imports: [CommonModule],
  exports: [LoaderComponent, VolumeCoverComponent, DisplayVolumeItem],
  providers: [LoaderService, NotificationService],
})
export class SharedModule {}
