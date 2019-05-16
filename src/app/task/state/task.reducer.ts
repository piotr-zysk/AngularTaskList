import { ITaskState } from '.';
import { TaskActionTypes } from './task.actions';

const initialState: ITaskState = {
    descriptionVisible: false,
    tasks: [],
    currentTaskId: null,
    error: '',
    loadTime: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    listFilter: ''
};

export function reducer(state: ITaskState = initialState, action): ITaskState {

    switch (action.type) {

        case TaskActionTypes.ToggleDescriptionVisibility:
            return {
                ...state,
                descriptionVisible: action.payload
            };

        case TaskActionTypes.LoadSuccess:
            return {
                ...state,
                tasks: action.payload,
                error: '',
                loadTime: Date()
            };

        case TaskActionTypes.LoadFail:
            return {
                ...state,
                tasks: [],
                error: action.payload
            };

        case TaskActionTypes.SetListFilter:
            return {
                ...state,
                listFilter: action.payload
            };

        default:
            return state;
    }
}
