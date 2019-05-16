import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { TaskService } from '../task.service';
import * as taskActions from './task.actions';
import { mergeMap, map } from 'rxjs/operators';
import { ITask } from '../task';


@Injectable()
export class TaskEffects {

    constructor(private actions$: Actions, private taskService: TaskService) { }

    @Effect()
    loadTasks$ = this.actions$.pipe(
        ofType(taskActions.TaskActionTypes.Load),
        mergeMap((action: taskActions.Load) => this.taskService.getTasks().pipe(
            map((tasks: ITask[]) => (new taskActions.LoadSuccess(tasks)))
        ))

    );
}
