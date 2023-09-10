import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { LoaderService } from './services/loader.service';
import { MaterialModule } from '../modules/material/material.module';
import { NotificationService } from './services/notification.service';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    LoaderComponent,
    PageNotFoundComponent,
    ConfirmationDialogComponent,
    TruncateTextPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  exports: [
    LoaderComponent,
    PageNotFoundComponent,
    ConfirmationDialogComponent,
    TruncateTextPipe,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    MaterialModule,
  ],
  providers: [LoaderService, NotificationService],
})
export class SharedModule {}
