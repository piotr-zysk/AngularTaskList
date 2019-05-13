export function reducer(state, action) {

    switch (action.type) {

        case 'TOGGLE_DESCRIPTION_VISIBILITY':
            return {
                ...state,
                descriptionsVisible: action.payload
            };

        default:
            return state;
    }
}