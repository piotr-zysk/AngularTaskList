import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './task-list.component';
import { HttpClientModule } from '@angular/common/http';
import { TaskDetailsComponent } from './task-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/task.reducer';
import { EffectsModule } from '@ngrx/effects';
import { TaskEffects } from './state/task.effects';



@NgModule({
  declarations: [
    TaskListComponent,
    TaskDetailsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    StoreModule.forFeature('tasks', reducer),
    EffectsModule.forFeature([TaskEffects])
  ]
})
export class TaskModule { }
