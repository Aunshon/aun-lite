import { createRoot } from '@wordpress/element';
import App from './components/App';
import * as aunPack from 'aun-pack';

import './aun-data/store';

document.addEventListener( 'DOMContentLoaded', () => {
	window.aunPack = aunPack;
	const root = createRoot(
		window.document.getElementById( 'aun-lite' )
);
	root.render( <App /> );
} );
