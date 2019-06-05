import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../task.service';
import * as taskActions from './task.actions';
import { mergeMap, map, tap, withLatestFrom, filter, switchMap, catchError, retry } from 'rxjs/operators';
import { ITask } from '../task';
import { Store } from '@ngrx/store';
import * as fromTask from '.';
import { Action } from 'rxjs/internal/scheduler/Action';
import { of, EMPTY } from 'rxjs';


@Injectable()
export class TaskEffects {

    constructor(private actions$: Actions, private taskService: TaskService, private store: Store<fromTask.IState>) { }

    x = false;

    @Effect()
    upsertTask$ = this.actions$
        .pipe(
            ofType<taskActions.UpsertOne>(taskActions.TaskActionTypes.UpsertOne),

            switchMap((action) => {
                return this.taskService.upsertTask(action.payload)
                    .pipe(
                        //tap((task) => console.log(task)),
                        map((task: ITask) => new taskActions.ForceLoad()));
            }
            ),


            );


    @Effect()
    deleteTask$ = this.actions$
        .pipe(
            ofType<taskActions.DeleteFromDB>(taskActions.TaskActionTypes.DeleteFromDB),

            switchMap((action) => {


                return this.taskService.deleteTask(action.payload.id).pipe(
                    map(() => new taskActions.DeleteFromStore(action.payload))
                )
            }
            ));


    @Effect()
    loadTasks$ = this.actions$
        .pipe(
            ofType<taskActions.Load>(taskActions.TaskActionTypes.Load),

            //Load new data only if previous load is over x miliseconds old
            withLatestFrom(this.store.select(fromTask.selectLoadTime)),
            filter(([a, loadTime]) => (Date.now() - Date.parse(loadTime) > 10000)),

            mergeMap(() => {
                return this.taskService.getTasks()
                    .pipe(tap(() => console.log('Task list loaded from DB at ' + new Date().toISOString().slice(0, 19))),
                        map((tasks: ITask[]) => (new taskActions.LoadSuccess(tasks))),

                        catchError((e) => of(new taskActions.LoadFail(e)))
                        );
            })

        );

    @Effect()
    forceLoadTasks$ = this.actions$
        .pipe(
            ofType<taskActions.ForceLoad>(taskActions.TaskActionTypes.ForceLoad),

            mergeMap(() => {
                return this.taskService.getTasks()
                    .pipe(tap(() => console.log('Task list loaded from DB at ' + new Date().toISOString().slice(0, 19))),
                        map((tasks: ITask[]) => (new taskActions.LoadSuccess(tasks))));
            })

        );


}
