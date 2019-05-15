import { Action } from '@ngrx/store';

export enum TaskActionTypes {
    ToggleDescriptionVisibility = '[Task] Toggle Descrip[tion Visibility'
}

export class ToggleDescriptionVisibility implements Action {
    readonly type = TaskActionTypes.ToggleDescriptionVisibility;

    constructor(public payload: boolean) {}
}

export type TaskActions = ToggleDescriptionVisibility;
