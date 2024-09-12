import {
	SET_FORM_DATA,
	SET_LOADING,
	SET_USERS,
	RESET_FORM_DATA,
	SET_EXTENTIONS_DATA,
	SET_EXTENTION_DATA,
	SET_FORM_EXTENTIONS_DATA
} from "./constants";

const DEFAULT_STATE = {
	allUsers: [],
	formData: {},
	formExtensionData: {},
	loading: false,
	extentions: {},
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
                formData: {},
								formExtensionData: {}
            };

        case SET_EXTENTIONS_DATA :
            return {
                ...state,
                extentions: action.payload
            };

				case SET_EXTENTION_DATA :
						return {
								...state,
								extentions: {
										...state.extentions,
										[action.payload.namespace]: action.payload.data
								}
					};

				case SET_FORM_EXTENTIONS_DATA :
					return {
						...state,
						formExtensionData: {
							...state.formExtensionData,
							[action.payload.namespace]: action.payload.data
						}
					};
    }

    return state;
};

export default reducer;
