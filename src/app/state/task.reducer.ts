import { ITaskState } from '../task';

const initialState: ITaskState = {
    descriptionVisible: false,
    tasks: [],
    currentTaskId: null
};

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
