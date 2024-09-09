import { SAVE_CONTACT, SET_FORM_DATA, SET_LOADING, SET_USERS, FETCH_FROM_API, RESET_FORM_DATA } from "./constants";

const actions = {
	setUsers( users ) {
		return {
			type: SET_USERS,
			payload: users
		};
	},

	setFormData( key, value ) {
		return {
			type: SET_FORM_DATA,
			payload: {
				key,
				value
			}
		}
	},

	resetFormData() {
		return {
			type: RESET_FORM_DATA,
		}
	},

	setLoading( value ) {
		return {
			type: SET_LOADING,
			payload: value
		}
	},


	*saveContact( value ) {
		yield actions.setLoading(true);
		try {
			yield {
				type: SAVE_CONTACT,
				payload: value
			};

			yield actions.fetchUsers();
		} catch (error) {
			// yield actions.setError(error);
			yield actions.setLoading(false);
		}
	},

	*fetchUsers() {
		const path = '/aun-lite/v1/data';
        yield actions.setLoading(true);
        const users = yield actions.fetchFromAPI( path );
        yield actions.setUsers( users );
		yield actions.resetFormData();
        yield actions.setLoading(false);
	},

	fetchFromAPI( path ) {
        return {
            type: FETCH_FROM_API,
            path,
        };
    },
};

export default actions;