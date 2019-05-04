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
  pageTitle: string = "Task List";
  listFilter: string = "";

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks=tasks;
      }
    )
  }

}
