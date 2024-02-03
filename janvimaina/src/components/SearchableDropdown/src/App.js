import "./styles.css";
import SearchableDropdown from "./SearchableDropdown";
import { ingredients } from "./data/ingredients";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("Search Ingredients");

  return (
    <div className="App">
      <SearchableDropdown
        options={ingredients}
        label="name"
        id="id"
        selectedVal={value}
        handleChange={(val) => setValue(val)}
      />
    </div>
  );
}
