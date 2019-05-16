import { ITask } from '../task';
import * as fromRoot from '../../state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTasks from './task.reducer';

export interface IState extends fromRoot.IState {
    tasks: ITaskState;
}


// Selector functions
const getTaskFeatureState = createFeatureSelector<ITaskState>('tasks');


export interface ITaskState {
    descriptionVisible: boolean;
    tasks: ITask[];
    currentTaskId: number;
    error: string;
    loadTime: string;
}

export const getTasks = createSelector(
    getTaskFeatureState,
    state => state.tasks
);

export const getError = createSelector(
    getTaskFeatureState,
    state => state.error
);



export const getDescriptionVisible = createSelector(getTaskFeatureState, state => state.descriptionVisible);
