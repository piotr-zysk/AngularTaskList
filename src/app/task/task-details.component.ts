import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from './task';


@Component({
  selector: 'tl-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {
  taskForm: FormGroup;

  pageTitle: string = 'Task Details';
  task: ITask;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');


    this.taskService.getTask(id).subscribe(
      task => {
        this.task = task;
        let id = new FormControl(this.task.id);
        let name = new FormControl(this.task.name);
        let description = new FormControl(this.task.description);
        let done = new FormControl(this.task.done);

        this.taskForm = new FormGroup({
          id: id,
          name: name,
          description: description,
          done: done
        });

      }
    );

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

  saveTask(value: any): void {
    console.log('saved:');
    console.log(value);
  }
}
