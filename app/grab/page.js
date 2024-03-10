'use client';
import {useState} from 'react';
import BannerImageNew from '../../assets/bannerused.png';
import {ingredients} from '@/data/ingredients';
import './grab.css';
import SearchableDropdown from '../../components/searchable-dropdown/searchable-dropdown';
import {storeIngredients} from './storeIngredients';

/**
 * @returns – Renders the Ingredients Selection Page
 */
function Grab() {
	const [value, setValue] = useState('Search Ingredients');
	console.log('value', value);
	return (
		<>
			<div className="grab" style={{backgroundImage: `url(${BannerImageNew.src})`}}>
			</div>
			{/* <div className="customTextNew">
        <p>Got Everything?</p>
      </div> */}
			<div className="customTexthome">
				<p>Find Ingredients in Your Pantry!</p>
				<SearchableDropdown
					options={ingredients}
					label="name"
					id="id"
					selectedVal={value}
					handleChange={(val) => setValue(val)}
				/>

				<button className="submit-button" onClick={() => storeIngredients(value)}>Submit</button>

			</div>


		</>
	);
}

export default Grab;
