import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskDetailsComponent } from './task-details.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TaskListComponent, TaskDetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ]
})
export class TaskModule { }
