'use client';

import React, {useState} from 'react';
import './dietary.css';
import {updateDiet} from './updateDiet';
import {useParams} from 'next/navigation';
import Link from 'next/link';

/**
 * @return {*} – Renders the Dietary Filters page
 */
export default function Dietary() {
	// State variables to track selected checkboxes
	const [intolerances, setIntolerances] = useState([]);
	const [selectedOption, setSelectedOption] = useState('Cuisine');
	const [selectedCuisines, setSelectedCuisines] = useState([]);
	const [selectedDiets, setSelectedDiets] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [timeRange, setTimeRange] = useState([10, 60]); // State for time range

	const params = useParams();
	console.log(params);
	const id = params['id'];

	// Function to handle checkbox change for intolerances
	const handleCheckboxChange = (e) => {
		const {value, checked} = e.target;
		if (checked) {
			setIntolerances([...intolerances, value]);
		} else {
			setIntolerances(intolerances.filter((item) => item !== value));
		}
	};

	// Function to handle checkbox change for cuisines
	const handleCuisineCheckboxChange = (e) => {
		const {value, checked} = e.target;
		if (checked) {
			setSelectedCuisines([...selectedCuisines, value]);
		} else {
			setSelectedCuisines(selectedCuisines.filter((item) => item !== value));
		}
	};

	// Function to handle checkbox change for diets
	const handleDietCheckboxChange = (e) => {
		const {value, checked} = e.target;
		if (checked) {
			setSelectedDiets([...selectedDiets, value]);
		} else {
			setSelectedDiets(selectedDiets.filter((item) => item !== value));
		}
	};

	// Function to handle slider change for time range
	const handleSliderChange = (e) => {
		setTimeRange(e.target.value.split(',').map(Number));
	};

	const generateDropdownOptions = () => {
		let filteredOptions;
		if (selectedOption === 'Intolerances') {
			// Allergy options, maybe we can filter by alchohol?
			const allergies = [
				'Dairy',
				'Egg',
				'Gluten',
				// 'Grains',
				'Peanuts',
				'Seafood',
				// 'Sesame',
				'Shellfish',
				// 'Soy',
				// 'Sulfite',
				'Tree Nut',
				'Alcohol',
				// 'Wheat',
			];
			filteredOptions = allergies.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		} else if (selectedOption === 'Cuisine') {
			// Cuisine options
			const cuisines = [
				'African',
				'American',
				'Asian',
				'British',
				'Cajun',
				'Caribbean',
				'Chinese',
				'Eastern European',
				'French',
				'German',
				'Greek',
				'Indian',
				'Irish',
				'Italian',
				'Jewish',
				'Japenese',
				'Korean',
				'Latin American',
				'Mexican',
				'Middle Eastern',
				'Nordic',
				'Southern',
				'Spanish',
				'Thai',
			];
			filteredOptions = cuisines.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		} else if (selectedOption === 'Diet') {
			// Diet options
			const diets = [
				'lacto vegetarian',
				'ovo vegetarian',
				'paleo',
				'pescetarian',
				'primal',
				'vegan',
				'vegetarian',
				'keto',
				'whole 30',
			];
			filteredOptions = diets.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		return (
			<div className="dropdown">
				<div className="dropdown-content">
					{selectedOption === 'Time' ? (
						<div className="time-slider">
							<input
								type="range"
								min="10"
								max="60"
								value={timeRange.join(',')}
								onChange={handleSliderChange}
								step="1"
							/>
							<p>{timeRange[0]} min</p>{' '}
							{/* Text to display selected time range */}
						</div>
					) : (
						filteredOptions.map((option) => (
							<label key={option} className="checkbox">
								<input
									type="checkbox"
									value={option}
									onChange={
										selectedOption === 'Cuisine' ?
											handleCuisineCheckboxChange :
											selectedOption === 'Diet' ?
												handleDietCheckboxChange :
												handleCheckboxChange
									}
									checked={
										selectedOption === 'Cuisine' ?
											selectedCuisines.includes(option) :
											selectedOption === 'Diet' ?
												selectedDiets.includes(option) :
												intolerances.includes(option)
									}
								/>
								<div>{option}</div>
							</label>
						))
					)}
				</div>
			</div>
		);
	};

	return (
		<div className="dietary-container">
			<div className="banner">
				<div className="header">Here's What We Found For You</div>
				<Link href={{pathname: `/grab`}}>
					<div className="go-back">
            &#60; Need To Reselect Your Ingredients?
					</div>
				</Link>
			</div>
			<div className="option-bar">
				<div className="explanation-text">
          Here, you can select your allergies and preferred dietary preferences.
				</div>
				<button
					className="submit-button"
					onClick={() =>
						updateDiet(id, selectedDiets, intolerances, selectedCuisines)
					}
				>
          Find Recipes
				</button>
			</div>

			<div className="dietary-content-search">
				<div className="newPage">
					<input
						className="search-text-field"
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<div className="options">
						<select onChange={(e) => setSelectedOption(e.target.value)}>
							<option value="Cuisine">Cuisine</option>
							<option value="Diet">Diet</option>
							<option value="Intolerances">Intolerances</option>
							<option value="Time">Time</option>
						</select>
					</div>
					<div className="filter">
						<button>Search</button>
					</div>
				</div>

				<div className="checkbox-container">{generateDropdownOptions()}</div>
			</div>
		</div>
	);
}
