import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Grab from "./pages/Grab";
import Dietary from "./pages/Dietary";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UsedSavedIngredients from "./pages/UseSavedIngredients";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/menu" exact component={Menu} />
          <Route path="/about" exact component={About} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/use" exact component={UsedSavedIngredients} />
          <Route path="/grab" exact component={Grab} />
          <Route path="/filter" exact component={Dietary} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
