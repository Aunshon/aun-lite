import { createRoot } from '@wordpress/element';
import App from './components/App';
import RouterApp from './components/RouterApp';
import * as aunPack from 'aun-pack';

import './aun-data/store';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';

document.addEventListener( 'DOMContentLoaded', () => {
	window.aunPack = aunPack;
	const root = createRoot(
		window.document.getElementById( 'aun-lite' )
);
	root.render(
		<BrowserRouter>
			{/* <RouterApp initialPath={''} /> */}
			<App />
		</BrowserRouter>
	);
} );
