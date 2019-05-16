import { Action } from '@ngrx/store';

export enum TaskActionTypes {
    ToggleDescriptionVisibility = '[Task] Toggle Descrip[tion Visibility',
    SetCurrentTask = '[Task] Set Current Task'
}

export class ToggleDescriptionVisibility implements Action {
    readonly type = TaskActionTypes.ToggleDescriptionVisibility;

    constructor(public payload: boolean) {}
}

export class SetCurrentTask implements Action {
    readonly type = TaskActionTypes.SetCurrentTask;

    constructor(public payload: number) {}
}

export type TaskActions = ToggleDescriptionVisibility | SetCurrentTask;
