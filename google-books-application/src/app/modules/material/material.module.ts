import { NgModule } from '@angular/core';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';

@NgModule({
  imports: [MatButtonModule],
  exports: [MatButtonModule],
})
export class MaterialModule {}
