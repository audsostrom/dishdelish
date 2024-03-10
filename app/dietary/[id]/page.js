"use client";

import React, { useState } from "react";
import "./dietary.css";
import { updateDiet } from "./updateDiet";
import { useParams } from "next/navigation";

function Dietary() {
	// State variables to track selected checkboxes
	const [intolerances, setIntolerances] = useState([]);
	const [selectedOption, setSelectedOption] = useState("Intolerances");
	const [selectedCuisines, setSelectedCuisines] = useState([]);
	const [selectedDiets, setSelectedDiets] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	// Function to handle checkbox change for intolerances
	const handleCheckboxChange = (e) => {
		const { value, checked } = e.target;
		if (checked) {
			setIntolerances([...intolerances, value]);
		} else {
			setIntolerances(intolerances.filter((item) => item !== value));
		}
	};

	// Function to handle checkbox change for cuisines
	const handleCuisineCheckboxChange = (e) => {
		const { value, checked } = e.target;
		if (checked) {
			setSelectedCuisines([...selectedCuisines, value]);
		} else {
			setSelectedCuisines(selectedCuisines.filter((item) => item !== value));
		}
	};

	// Function to handle checkbox change for diets
	const handleDietCheckboxChange = (e) => {
		const { value, checked } = e.target;
		if (checked) {
			setSelectedDiets([...selectedDiets, value]);
		} else {
			setSelectedDiets(selectedDiets.filter((item) => item !== value));
		}
	};

	const generateDropdownOptions = () => {
		let filteredOptions;
		if (selectedOption === "Intolerances") {
			// Allergy options
			const allergies = [
				"Dairy",
				"Egg",
				"Gluten",
				"Grains",
				"Peanuts",
				"Seafood",
				"Sesame",
				"Shellfish",
				"Soy",
				"Sulfite",
				"Tree Nut",
				"Wheat",
			];
			filteredOptions = allergies.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		} else if (selectedOption === "Cuisine") {
			// Cuisine options
			const cuisines = [
				"African",
				"American",
				"Asian",
				"British",
				"Cajun",
				"Caribbean",
				"Chinese",
				"Eastern European",
				"French",
				"German",
				"Greek",
				"Indian",
				"Irish",
				"Italian",
				"Jewish",
				"Japenese",
				"Korean",
				"Latin American",
				"Mexican",
				"Middle Eastern",
				"Nordic",
				"Southern",
				"Spanish",
				"Thai",
			];
			filteredOptions = cuisines.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		} else if (selectedOption === "Diet") {
			// Diet options
			const diets = [
				"Lacto Vegeterian",
				"Ovo Vegeterian",
				"Playo",
				"Pesceterian",
				"Primal",
				"Vegan",
				"Vegeterian",
				"Keto",
				"Whole 30",
			];
			filteredOptions = diets.filter((option) =>
				option.toLowerCase().includes(searchTerm.toLowerCase()),
			);
		}

		return (
			<div className="dropdown">
				<div className="dropdown-content">
					{filteredOptions.map((option) => (
						<label key={option} className="checkbox">
							{" "}
							{/* Wrap each row with label */}
							<input
								type="checkbox"
								value={option}
								onChange={
									selectedOption === "Cuisine"
										? handleCuisineCheckboxChange
										: selectedOption === "Diet"
											? handleDietCheckboxChange
											: handleCheckboxChange
								}
								checked={
									selectedOption === "Cuisine"
										? selectedCuisines.includes(option)
										: selectedOption === "Diet"
											? selectedDiets.includes(option)
											: intolerances.includes(option)
								}
							/>
							<div>{option}</div> {/* Place label text inside a div */}
						</label>
					))}
				</div>
			</div>
		);
	};

	return (
		<div>
			<div className="newPage">
				<div className="search">
					<input
						type="text"
						placeholder="Search..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
				<div className="options">
					<select onChange={(e) => setSelectedOption(e.target.value)}>
						<option value="Any">Any</option>
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
	);
}

export default Dietary;
