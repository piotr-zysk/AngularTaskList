import { ITask } from '../task';
import * as fromRoot from '../../state';
import { createFeatureSelector, createSelector, ActionReducerMap } from '@ngrx/store';
import { EntityState } from '@ngrx/entity';
import * as fromTasks from './task.reducer';

export interface IState extends fromRoot.IState {
    tasks: ITaskState;
}


// Selector functions
const getTaskFeatureState = createFeatureSelector<ITaskState>('tasks');


export interface ITaskState extends EntityState<ITask> {
    descriptionVisible: boolean;
    currentTaskId: number;
    error: string;
    loadTime: string;
    listFilter: string;
}

/*
export const reducers: ActionReducerMap<ITaskState> = {
    tasks: fromTasks.reducer;
};
*/



export const getTasks = createSelector(
    getTaskFeatureState,
    fromTasks.selectAllTasks
);

export const getError = createSelector(
    getTaskFeatureState,
    state => state.error
);

export const getListFilter = createSelector(
    getTaskFeatureState,
    state => state.listFilter
);


export const getDescriptionVisible = createSelector(
    getTaskFeatureState,
    state => state.descriptionVisible
);

export const selectLoadTime = createSelector(
    getTaskFeatureState,
    state => state.loadTime
);
