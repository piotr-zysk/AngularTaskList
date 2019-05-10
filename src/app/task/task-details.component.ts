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
  title: string;

  constructor(private taskService: TaskService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    if (id == 0) {
      this.title = 'New Task';
      let task: ITask = { id: 0, name: '', description: '', done: false };
      this.initForm(task);
    }
    else {
      this.title = 'Task: '+id;
      this.taskService.getTask(id).subscribe(
        task => this.initForm(task)
      );
    }
    /*
    {
      'id': id,
      'name': 'test',
      'description': 'test decription',
      'done': false
    }
    */

  }

  private initForm(task: ITask): void {

    this.task = task;
    let id = new FormControl(this.task.id)
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

  onBack(): void {
    this.router.navigate(['/tasklist']);
  }

  saveTask(value: ITask): void {
    this.taskService.updateTask(value).subscribe(() => this.router.navigate(['/tasklist']));
  }

  
  
}
