import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from './task';
import { nameDescriptionValidator } from './name-description.directive';


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
      this.title = 'Task: ' + id;
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
    let name = new FormControl(this.task.name, Validators.required);
    let description = new FormControl(this.task.description, Validators.required);
    let done = new FormControl(this.task.done);


    this.taskForm = new FormGroup({
      id: id,
      name: name,
      description: description,
      done: done
    },{validators: nameDescriptionValidator});
  }

  onBack(): void {
    this.router.navigate(['/tasklist']);
  }

  saveTask(value: ITask): void {
    if (this.taskForm.valid) {
      this.taskService.updateTask(value).subscribe(() => this.router.navigate(['/tasklist']));
    }
  }

  deleteTask(value: number): void {
    if (window.confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(value).subscribe(() => this.router.navigate(['/tasklist']));
  }
}


}
