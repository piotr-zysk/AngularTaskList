import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ITask } from '../task';

export enum TaskActionTypes {
    ToggleDescriptionVisibility = '[Task] Toggle Descrip[tion Visibility',
    SetCurrentTask = '[Task] Set Current Task',

    Load = '[Task] Load',
    LoadSuccess = '[Task] Load Success',
    LoadFail = '[Task] Load Fail',

    SetListFilter = '[Task] Set listFilter'
}

export class ToggleDescriptionVisibility implements Action {
    readonly type = TaskActionTypes.ToggleDescriptionVisibility;

    constructor(public payload: boolean) {}
}

export class SetCurrentTask implements Action {
    readonly type = TaskActionTypes.SetCurrentTask;

    constructor(public payload: number) {}
}

export class Load implements Action {
    readonly type = TaskActionTypes.Load;
}

export class LoadSuccess implements Action {
    readonly type = TaskActionTypes.LoadSuccess;

    constructor(public payload: ITask[]) {}
}

export class LoadFail implements Action {
    readonly type = TaskActionTypes.LoadFail;

    constructor(public payload: string) {}
}

export class SetListFilter implements Action {
    readonly type = TaskActionTypes.SetListFilter;

    constructor(public payload: string) {}
}


export type TaskActions = ToggleDescriptionVisibility
    | SetCurrentTask
    | Load
    | LoadSuccess
    | LoadFail
    | SetListFilter;
