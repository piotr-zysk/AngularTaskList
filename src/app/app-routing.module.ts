import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task/task-list.component';
import { WelcomeComponent } from './home/welcome.component';
import { TaskDetailsComponent } from './task/task-details.component';
import { TaskDetailsGuard } from './task/task-details.guard';
import { CanDeactivateGuard } from './shared/can-deactivate.guard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: 'tasklist', component: TaskListComponent, data: {animation: 'TaskListPage'} },
  { path: 'tasks/:id', canActivate: [TaskDetailsGuard], canDeactivate: [CanDeactivateGuard], component: TaskDetailsComponent },
  { path: 'welcome', component: WelcomeComponent, data: {animation: 'WelcomePage'}  },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
