import { SlotFillProvider, TextControl, Button, Panel } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { PluginArea } from '@wordpress/plugins';
import {AunContactField, AunDisplayContact} from 'aun-pack'
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
		select => {
			const formData = select(store).getFormData();
			const formExtentionData = select(store).getFormExtension();
			return {
				...formData,
				extentions: formExtentionData
			}
		},
		[]
	);

	const handleSubmit = e => {
		e.preventDefault();

		const res = saveContact(formData);
	}

	return (
		<div style={{
			width: '50vh',
		}}>
			<SlotFillProvider>
				{/*<fieldset>*/}
				{/*	{*/}
				{/*		users.map(user => {*/}
				{/*			return <>*/}
				{/*			<code>{JSON.stringify(user)}</code>*/}
				{/*			<br />*/}
				{/*			</>*/}
				{/*		})*/}
				{/*	}*/}
				{/*</fieldset>*/}
				<div>
					<h4><b>Name:</b> { users?.name ?? '' }</h4>
					<h4><b>Age:</b> { users?.age ?? '' }</h4>

					<AunDisplayContact.Slot/>
				</div>
				<hr/>
				<form action="post" onSubmit={handleSubmit}>
					<TextControl
						label="Name"
						value={ formData.name ?? '' }
						onChange={ ( value ) => setFormData( 'name', value ) }
					/>

					<TextControl
						label="Age"
						type="number"
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
		</div>
	);
}

export default App;
