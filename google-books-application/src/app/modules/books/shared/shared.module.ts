import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorService } from './services/error.service';
import { LoaderService } from './services/loader.service';
import { VolumeCoverComponent } from './components/volume-cover/volume-cover.component';
import { DisplayItemComponent } from './components/display-item/display-item.component';
import { DisplayListItemsComponent } from './components/display-list-items/display-list-items.component';

@NgModule({
  declarations: [
    LoaderComponent,
    VolumeCoverComponent,
    DisplayItemComponent,
    DisplayListItemsComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoaderComponent,
    VolumeCoverComponent,
    DisplayItemComponent,
    DisplayListItemsComponent,
  ],
  providers: [LoaderService, ErrorService],
})
export class SharedModule {}
