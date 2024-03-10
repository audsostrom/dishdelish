import { useEffect, useRef, useState } from "react";
import "./searchable-dropdown.css";

const SearchableDropdown = ({
	options,
	label,
	id,
	selectedVal,
	handleChange,
}) => {
	const [query, setQuery] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [selectedItems, setSelectedItems] = useState([]);

	const inputRef = useRef(null);

	useEffect(() => {
		document.addEventListener("click", toggle);
		return () => document.removeEventListener("click", toggle);
	}, []);

	const selectOption = (option) => {
		setQuery("");
		setIsOpen(false);

		// If the option is already selected, remove it; otherwise, add it to the list
		const updatedSelectedItems = selectedItems.includes(option[label])
			? selectedItems.filter((item) => item !== option[label])
			: [...selectedItems, option[label]];

		setSelectedItems(updatedSelectedItems);
		handleChange(updatedSelectedItems);
	};

	const deselectItem = (item) => {
		const updatedSelectedItems = selectedItems.filter(
			(selectedItem) => selectedItem !== item
		);
		setSelectedItems(updatedSelectedItems);
		handleChange(updatedSelectedItems);
	};

	function toggle(e) {
		setIsOpen(e && e.target === inputRef.current);
	}

	const filter = (options) => {
		return options.filter(
			(option) => option[label].toLowerCase().indexOf(query.toLowerCase()) > -1
		);
	};

	return (
		<div className="dropdown">
			<div className="control">
				<div className="selected-value">
					<input
						ref={inputRef}
						type="text"
						placeholder="Search Ingredients"
						value={query}
						name="searchTerm"
						onChange={(e) => setQuery(e.target.value)}
						onClick={toggle}
					/>
				</div>
				<div className={`arrow ${isOpen ? "open" : ""}`}></div>
			</div>

			<div className={`options ${isOpen ? "open" : ""}`}>
				{filter(options).map((option, index) => (
					<div
						onClick={() => selectOption(option)}
						className={`option ${
							selectedItems.includes(option[label]) ? "selected" : ""
						}`}
						key={`${id}-${index}`}
					>
						{option[label]}
					</div>
				))}
			</div>

			<div className="selected-items">
				<p>Selected Ingredients:</p>
				{selectedItems.map((item, index) => (
					<div className="selected-item" key={`selected-${index}`}>
						<span onClick={() => deselectItem(item)}>✖️</span> {item} 
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchableDropdown;
