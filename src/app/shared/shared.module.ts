import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from './app-material/app-material.module';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { CategoryPipe } from './pipes/category.pipe';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [

  ],
  imports: [
    AppMaterialModule,
    CategoryPipe,
    CommonModule,
    ConfirmationDialogComponent,
    ErrorDialogComponent
  ],
  exports: [
    CategoryPipe,
    ConfirmationDialogComponent,
    ErrorDialogComponent
  ]
})
export class SharedModule { }
