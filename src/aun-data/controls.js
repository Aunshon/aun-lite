import apiFetch from '@wordpress/api-fetch';
import actions from './actions';
const  controls = {
    FETCH_FROM_API( action ) {
        return apiFetch( { path: action.path } );
    },

    SAVE_CONTACT({payload}) {
        const path = '/aun-lite/v1/data';
        return apiFetch({
            path,
            method: 'POST',
            data: payload,
        });
    },
};

export default controls;