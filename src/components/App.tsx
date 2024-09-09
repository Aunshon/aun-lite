import { SlotFillProvider, TextControl, Button } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { PluginArea } from '@wordpress/plugins';
import {AunContactField} from 'aun-pack'
import store from '../aun-data/store';

function App() {
	const { setFormData, setLoading, saveContact } = useDispatch( store );

	const users = useSelect(
		select => select( store ).getUsers(),
		[]
	);

	const loading = useSelect(
		select => select( store ).getLoading(),
		[]
	);

	const formData = useSelect(
		select => select( store ).getFormData(),
		[]
	);

	const handleSubmit = e => {
		e.preventDefault();

		const res = saveContact(formData);
	}

	return (
		<SlotFillProvider>
			<fieldset>
				{
					users.map(user => {
						return <>
						<code>{JSON.stringify(user)}</code>
						<br />
						</>
					})
				}
			</fieldset>
			<hr/>
			<form action="post" onSubmit={handleSubmit}>
				<TextControl
					label="Name"
					value={ formData.name ?? '' }
					onChange={ ( value ) => setFormData( 'name', value ) }
				/>

				<TextControl
					label="Age"
					value={ formData.age ?? '' }
					onChange={ ( value ) => setFormData( 'age', value ) }
				/>



				<AunContactField.Slot/>
				<PluginArea/>

				<Button
					text='Save'
					type='submit'
					variant='primary'
					isBusy={loading}
					disabled={loading}
				/>
			</form>
		</SlotFillProvider>
	);
}

export default App;
