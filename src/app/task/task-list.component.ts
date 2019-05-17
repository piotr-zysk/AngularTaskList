import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { ITask } from './task';
import { fromEvent } from '../shared/from-event.service';
import { Store, select } from '@ngrx/store';
import * as fromTask from './state';
import * as taskActions from './state/task.actions';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';


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
    const ENTER_KEY = 13;
    const filterInput = document.getElementById('filterInput') as HTMLInputElement;

      /*
    const subscription = fromEvent(filterInput, 'keydown')
      .subscribe((e: KeyboardEvent) => {
        // tslint:disable-next-line: deprecation
        if (e.keyCode === ESC_KEY) {
          // filterInput.value = '';
          this.listFilter = '';
        } else if (e.keyCode === ENTER_KEY) {
          this.store.dispatch(new taskActions.SetListFilter(this.listFilter));
          console.log('List filter "'+this._listFilter+'" saved in store');
        }
      });
      */

    const subscription = fromEvent(filterInput, 'input').pipe(
        map((e: KeyboardEvent) => (e.target as HTMLTextAreaElement).value),
        filter(text => text.length > 1 || text.length === 0),
        debounceTime(500),
        distinctUntilChanged()
      );
    subscription.subscribe(filterText => {
      this.listFilter = filterInput.value;
      this.store.dispatch(new taskActions.SetListFilter(this.listFilter));

    }
      );

    this.store.dispatch(new taskActions.Load());
    this.store.pipe(select(fromTask.getTasks)).subscribe((tasks: ITask[]) => {
      this.tasks = tasks;
      this.filteredTasks = this.listFilter ? this.performFilter(this.listFilter) : this.tasks;
    });

    this.store.pipe(select(fromTask.getListFilter)).subscribe((filter: string) => {
      this.listFilter = filter;
      filterInput.value = filter;
    });

  }

}
