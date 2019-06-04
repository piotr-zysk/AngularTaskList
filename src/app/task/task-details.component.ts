import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TaskService } from './task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask } from './task';
import { nameDescriptionValidator } from './name-description.directive';
import { Observable } from 'rxjs';
import { DialogService } from '../shared/dialog.service';
import * as fromTask from './state';
import { Store, select } from '@ngrx/store';
import * as taskActions from './state/task.actions';

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

  formSaved: boolean = false;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private store: Store<fromTask.IState>) { }

  ngOnInit() {
    let id = +this.route.snapshot.paramMap.get('id');

    if (id === 0) {
      this.title = 'New Task';

      let task: ITask = { id: 0, name: '', description: '', done: false };

      this.initForm(task);
    } else {
      this.title = 'Task: ' + id;


      this.store.pipe(select(fromTask.selectTaskById, {taskId: id})).subscribe(
        task => this.initForm(task)
      );


      /*
      this.taskService.getTask(id).subscribe(
        task => this.initForm(task)
      );
      */

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

    if (!task) {return;}

    this.task = task;
    let id = new FormControl(this.task.id);
    let name = new FormControl(this.task.name, Validators.required);
    let description = new FormControl(this.task.description, Validators.required);
    let done = new FormControl(this.task.done);



    this.taskForm = new FormGroup({
      id: id,
      name: name,
      description: description,
      done: done
    }, { validators: nameDescriptionValidator });
  }

  onBack(): void {
    this.router.navigate(['/tasklist']);
  }

  saveTask(value: ITask): void {
    if (this.taskForm.valid) {
      console.log(value);
      this.store.dispatch(new taskActions.UpsertOne(value));

      this.formSaved = true;
      this.router.navigate(['/tasklist']);

      //this.taskService.updateTask(value).subscribe(() => { this.formSaved = true; this.router.navigate(['/tasklist']); });
    }
  }

  deleteTask(value: number): void {
    if (window.confirm('Are you sure you want to delete this task? id:' + value)) {

      this.store.dispatch(new taskActions.DeleteFromDB({id: value}));
      this.formSaved = true;
      this.router.navigate(['/tasklist']);
      //this.taskService.deleteTask(value).subscribe(() => this.router.navigate(['/tasklist']));
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    // Allow synchronous navigation (`true`) if no crisis or the crisis is unchanged
    if (((this.task.name === this.taskForm.controls.name.value)
      && (this.task.description === this.taskForm.controls.description.value)
      && (this.task.done === this.taskForm.controls.done.value))
      || this.formSaved) {
      return true;
    }
    // Otherwise ask the user with the dialog service and return its
    // observable which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }


}
