import { SET_FORM_DATA, SET_LOADING, SET_USERS, RESET_FORM_DATA } from "./constants";

const DEFAULT_STATE = {
	allUsers: [],
    formData: {},
    loading: false
};

const reducer = ( state = DEFAULT_STATE, action ) => {
    switch ( action.type ) {
        case SET_USERS:
            return {
                ...state,
                allUsers: action.payload,
            };

        case SET_FORM_DATA:
            const updatedFormData = {
                ...state.formData,
                [action.payload.key] : action.payload.value
            };

            return {
                ...state,
                formData: updatedFormData
            };

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            };

        case RESET_FORM_DATA :
            return {
                ...state,
                formData: {}
            }
    }

    return state;
};

export default reducer;