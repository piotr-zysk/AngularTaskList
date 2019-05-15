import { ITaskState } from '../task';
import { TaskActionTypes } from '../task/state/task.actions';

const initialState: ITaskState = {
    descriptionVisible: false,
    tasks: [],
    currentTaskId: null
};

export function reducer(state: ITaskState = initialState, action): ITaskState {

    switch (action.type) {

        case TaskActionTypes.ToggleDescriptionVisibility:
            return {
                ...state,
                descriptionVisible: action.payload
            };

        default:
            return state;
    }
}
