import { NgModule } from '@angular/core';
import { LoaderComponent } from './components/loader/loader.component';
import { NavigateBackComponent } from './components/navigate-back/navigate-back.component';

@NgModule({
  declarations: [LoaderComponent, NavigateBackComponent],
  imports: [],
  exports: [LoaderComponent, NavigateBackComponent],
})
export class SharedModule {}
