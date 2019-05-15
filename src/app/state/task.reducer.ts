import { ITask } from '../task/task';
import * as fromRoot from './app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface IState extends fromRoot.IState {
    tasks: ITaskState;
}

export interface ITaskState {
    descriptionVisible: boolean;
    tasks: ITask[];
    currentTaskId: number;
}

const initialState: ITaskState = {
    descriptionVisible: false,
    tasks: [],
    currentTaskId: null
}

const getTaskFeatureState = createFeatureSelector<ITaskState>('tasks');

export const getDescriptionVisible = createSelector(getTaskFeatureState, state => state.descriptionVisible);


export function reducer(state: ITaskState = initialState, action): ITaskState {

    switch (action.type) {

        case 'TOGGLE_DESCRIPTION_VISIBILITY':
            return {
                ...state,
                descriptionVisible: action.payload
            };

        default:
            return state;
    }
}
