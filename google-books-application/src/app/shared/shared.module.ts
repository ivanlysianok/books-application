import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DisplayItemComponent } from './components/display-item/display-item.component';
import { DisplayListItemsComponent } from './components/display-list-items/display-list-items.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { VolumeCoverComponent } from './components/volume-cover/volume-cover.component';
import { TruncatePipe } from './pipes/truncate-text.pipe';
import { ErrorService } from './services/error.service';
import { LoaderService } from './services/loader.service';

@NgModule({
  declarations: [
    LoaderComponent,
    VolumeCoverComponent,
    DisplayItemComponent,
    DisplayListItemsComponent,
    PageNotFoundComponent,
    TruncatePipe,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  exports: [
    LoaderComponent,
    VolumeCoverComponent,
    DisplayItemComponent,
    DisplayListItemsComponent,
    PageNotFoundComponent,
    TruncatePipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
  ],
  providers: [LoaderService, ErrorService],
})
export class SharedModule {}
