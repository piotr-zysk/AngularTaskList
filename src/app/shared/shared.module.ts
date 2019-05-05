import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusDisplayComponent } from './status-display.component';


@NgModule({
  declarations: [StatusDisplayComponent],
  imports: [
    CommonModule
  ],
  exports: [
    StatusDisplayComponent
  ]
})
export class SharedModule { }
