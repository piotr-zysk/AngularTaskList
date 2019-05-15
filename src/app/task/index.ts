import { ITask } from '../task/task';
import * as fromRoot from '../state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface IState extends fromRoot.IState {
    tasks: ITaskState;
}

export interface ITaskState {
    descriptionVisible: boolean;
    tasks: ITask[];
    currentTaskId: number;
}



const getTaskFeatureState = createFeatureSelector<ITaskState>('tasks');

export const getDescriptionVisible = createSelector(getTaskFeatureState, state => state.descriptionVisible);
