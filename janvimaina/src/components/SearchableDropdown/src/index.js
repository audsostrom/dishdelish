import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SearchableDropdown from "./SearchableDropdown";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);

export default SearchableDropdown;
