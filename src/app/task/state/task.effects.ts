import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../task.service';
import * as taskActions from './task.actions';
import { mergeMap, map, tap, withLatestFrom, filter } from 'rxjs/operators';
import { ITask } from '../task';
import { Store } from '@ngrx/store';
import * as fromTask from '.';


@Injectable()
export class TaskEffects {

    constructor(private actions$: Actions, private taskService: TaskService, private store: Store<fromTask.IState>) { }

    x = false;

    @Effect()
    loadTasks$ = this.actions$
    .pipe(
        ofType(taskActions.TaskActionTypes.Load),

        //Load new data only if previous load is over x miliseconds old
        withLatestFrom(this.store.select(fromTask.selectLoadTime)),
        filter(([a, loadTime]) => (Date.now() - Date.parse(loadTime) > 10000)),

        mergeMap(() => this.taskService.getTasks()
        .pipe(
            tap(() => console.log('Task list loaded from DB at ' + new Date().toISOString().slice(0,19))),
            map((tasks: ITask[]) => (new taskActions.LoadSuccess(tasks)))
        ))

    );
}
