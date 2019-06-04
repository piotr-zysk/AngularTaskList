import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { ITask } from '../task';

export enum TaskActionTypes {
    ToggleDescriptionVisibility = '[Task] Toggle Descrip[tion Visibility',
    SetCurrentTask = '[Task] Set Current Task',

    Load = '[Task] Load',
    ForceLoad = '[Task] Forced Load',
    LoadSuccess = '[Task] Load Success',
    LoadFail = '[Task] Load Fail',

    UpsertOne = '[Task] Upsert',
    UpsertSuccess = '[Task] Upsert Success',
    UpsertFail = '[Task] Upsert Fail',

    DeleteFromDB = '[Task] Delete From Database',
    DeleteFromStore = '[Task] Delete From Store',

    SetListFilter = '[Task] Set listFilter'
}

export class ToggleDescriptionVisibility implements Action {
    readonly type = TaskActionTypes.ToggleDescriptionVisibility;

    constructor(public payload: boolean) { }
}

export class SetCurrentTask implements Action {
    readonly type = TaskActionTypes.SetCurrentTask;

    constructor(public payload: number) { }
}

export class Load implements Action {
    readonly type = TaskActionTypes.Load;
}

export class ForceLoad implements Action {
    readonly type = TaskActionTypes.ForceLoad;
}

export class LoadSuccess implements Action {
    readonly type = TaskActionTypes.LoadSuccess;

    constructor(public payload: ITask[]) { }
}

export class LoadFail implements Action {
    readonly type = TaskActionTypes.LoadFail;

    constructor(public payload: string) { }
}

export class UpsertOne implements Action {
    readonly type = TaskActionTypes.UpsertOne;

    constructor(public payload: ITask = null) { }
}

export class UpsertSuccess implements Action {
    readonly type = TaskActionTypes.UpsertSuccess;

    constructor(public payload: ITask = null) { }
}

export class UpsertFail implements Action {
    readonly type = TaskActionTypes.UpsertFail;

    constructor(public payload: string) { }
}

export class DeleteFromDB implements Action {
    readonly type = TaskActionTypes.DeleteFromDB;

    constructor(public payload: { id: number }) { }
}

export class DeleteFromStore implements Action {
    readonly type = TaskActionTypes.DeleteFromStore;

    constructor(public payload: { id: number }) { }
}


export class SetListFilter implements Action {
    readonly type = TaskActionTypes.SetListFilter;

    constructor(public payload: string) { }
}


export type TaskActions = ToggleDescriptionVisibility
    | SetCurrentTask
    | Load
    | ForceLoad
    | LoadSuccess
    | LoadFail
    | UpsertOne
    | UpsertSuccess
    | UpsertFail
    | DeleteFromDB
    | DeleteFromStore
    | SetListFilter;
