import { ITaskState } from '.';
import { TaskActionTypes } from './task.actions';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ITask } from '../task';


export const adapter: EntityAdapter<ITask> = createEntityAdapter<ITask>();

const initialState: ITaskState = adapter.getInitialState({
    descriptionVisible: false,
    currentTaskId: null,
    error: null,
    loadTime: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    listFilter: ''
});

export function reducer(state: ITaskState = initialState, action): ITaskState {

    switch (action.type) {

        case TaskActionTypes.ToggleDescriptionVisibility:
            return {
                ...state,
                descriptionVisible: action.payload
            };

        case TaskActionTypes.LoadSuccess:
            return adapter.addAll(action.payload, {...state, error: '', loadTime: Date()});

        case TaskActionTypes.LoadFail:
            return adapter.removeAll({...state, error: action.payload});

        case TaskActionTypes.SetListFilter:
            return {
                ...state,
                listFilter: action.payload
            };

        default:
            return state;
    }
}


export const getSelectedTaskId = (state: ITaskState) => state.currentTaskId;

// get the selectors
const {
    selectAll,
    selectIds
  } = adapter.getSelectors();

export const selectTaskIds = selectIds;
// select the array of users
export const selectAllTasks = selectAll;
