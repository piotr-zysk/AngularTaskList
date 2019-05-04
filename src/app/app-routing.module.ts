import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TaskListComponent } from './task/task-list.component';
import { WelcomeComponent } from './home/welcome.component';

const routes: Routes = [
  { path: 'tasklist', component: TaskListComponent },
  { path: 'tasks/:id', component: TaskListComponent },
  { path: 'welcome', component: WelcomeComponent },
  { path: '', redirectTo: 'welcome', pathMatch: 'full' }
  //,{ path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
