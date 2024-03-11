'use client';
import {useState} from 'react';
import {ingredients} from '@/data/ingredients';
import './grab.css';
import SearchableDropdown from '../../components/searchable-dropdown/searchable-dropdown';
import {storeIngredients} from './storeIngredients';

/**
 * @return – Renders the Ingredients Selection Page
 */
export default function Grab() {
	const [value, setValue] = useState([]);
	console.log('value', value);
	return (
		<div className='grab-container'>
			<div className='banner'>
				<div className='header'>Grab Everything!</div>
				<div className='go-back'>Select the ingredients you have on-hand</div>
			</div>
			<div className='option-bar'>
				<div className='explanation-text'>If you're logged in, your ingredients from the previous session are saved</div>
				<button className="submit-button" onClick={() => storeIngredients(value)}>Got Everything?</button>
			</div>
			<div className="customTexthome">
				<p>Find Ingredients in Your Pantry!</p>
				<SearchableDropdown
					options={ingredients}
					label="name"
					id="id"
					selectedVal={value}
					handleChange={(val) => setValue(val)}
				/>
			</div>


		</div>
	);
}
