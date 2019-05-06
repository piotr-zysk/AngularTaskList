import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from './task';

@Component({
  selector: 'tl-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  pageTitle: string = 'Task Details';
  task: ITask;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    this.taskService.getTask(id).subscribe(
      task => {
        this.task = task;
      }
    )


    /*
    {
      'id': id,
      'name': 'test',
      'description': 'test decription',
      'done': false
    }
    */

  }

  onBack(): void {
    this.router.navigate(['/tasklist']);
  }

}
