import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { ITask } from './task';
import { fromEvent } from '../shared/from-event.service';
import { Store, select } from '@ngrx/store';
import * as fromTask from './state';
import * as taskActions from './state/task.actions';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: ITask[] = [];
  filteredTasks: ITask[] = [];
  pageTitle = 'Task List';

  descriptionVisible: boolean;

  _listFilter = '';

  constructor(private taskService: TaskService,
    private store: Store<fromTask.IState>) {
    this.listFilter = '';
  }

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


  toggleDescriptionVisibility(value: boolean): void {
    this.store.dispatch(new taskActions.ToggleDescriptionVisibility(value));
  }

  ngOnInit(): void {

    /*
    this.taskService.getTasks().subscribe(
      tasks => {
        this.tasks = tasks;
        this.filteredTasks = this.tasks;
      }
    );
    */


    this.store.pipe(select(fromTask.getDescriptionVisible)).subscribe(
      descriptionVisible => {
        return this.descriptionVisible = descriptionVisible;
      }
    );

    const ESC_KEY = 27;
    const filterInput = document.getElementById('filterInput') as HTMLInputElement;

    const subscription = fromEvent(filterInput, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        // tslint:disable-next-line: deprecation
        if (e.keyCode === ESC_KEY) {
          // filterInput.value = '';
          this.listFilter = '';
        }
      });

    this.listFilter = '12';

    this.store.dispatch(new taskActions.Load());
    this.store.pipe(select(fromTask.getTasks)).subscribe((tasks: ITask[]) => { this.tasks = tasks; this.listFilter='' });

  }

}
