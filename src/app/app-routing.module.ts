import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task/task-list.component';
import { WelcomeComponent } from './home/welcome.component';
import { TaskDetailsComponent } from './task/task-details.component';
import { TaskDetailsGuard } from './task/task-details.guard';
import { CanDeactivateGuard } from './shared/can-deactivate.guard';

const routes: Routes = [
  { path: 'tasklist', component: TaskListComponent },
  { path: 'tasks/:id', canActivate: [TaskDetailsGuard], canDeactivate: [CanDeactivateGuard], component: TaskDetailsComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
