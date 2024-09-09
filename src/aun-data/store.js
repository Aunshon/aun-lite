import { createReduxStore, register } from '@wordpress/data';

import actions from './actions';
import reducer from './reducer';
import selectors from './selectors';
import controls from './controls';
import resolvers from './resolvers';


const store = createReduxStore( 'aun-data', {
	reducer,
	actions,
	selectors,
	controls,
	resolvers,
} );

register( store );


export default store;