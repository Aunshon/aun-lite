import {
	SAVE_CONTACT,
	SET_FORM_DATA,
	SET_LOADING,
	SET_USERS,
	FETCH_FROM_API,
	RESET_FORM_DATA,
	SET_EXTENTIONS_DATA,
	SET_EXTENTION_DATA, SET_FORM_EXTENTIONS_DATA
} from "./constants";

const actions = {
	setExtensions( extentions ) {
		return {
			type: SET_EXTENTIONS_DATA,
			payload: extentions
		};
	},

	setExtension( namespace, data ) {
		return {
			type: SET_EXTENTION_DATA,
			payload: {
				namespace,
				data
			}
		};
	},

	setFormExtensionData( namespace, data ) {
		return {
			type: SET_FORM_EXTENTIONS_DATA,
			payload: {
				namespace,
				data
			}
		};
	},

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
        yield actions.setExtensions( users.extentions );
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
