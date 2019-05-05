import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { ITask } from './task';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  pageTitle: string = "Task List";



  _listFilter: string = "";
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredTasks = this.listFilter ? this.performFilter(this.listFilter) : this.tasks;
  }

  performFilter(filterBy: string): ITask[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.tasks.filter((task: ITask) =>
      task.name.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  constructor(private taskService: TaskService) {
    this.listFilter = '';
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
      }
    )
  }

}
