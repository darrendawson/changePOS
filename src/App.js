import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// components
import Navbar from './Components/Navbar/Navbar.js';

// Ustra
import Ustra from './Ustra.js';

// =============================================================================
// Ustra
// =============================================================================

// options
const __pageOptions = ["point-of-sale"];

// path tags
const PT_currentPage = "currentPage";

// what App.state will look like
let dataSkeleton = {
  [PT_currentPage]: __pageOptions[0]
};

var ustra = new Ustra(dataSkeleton);

// =============================================================================
// <App/>
// =============================================================================

class App extends Component {

  constructor() {
    super();

    this.state = {
      truth: ustra.get_truth()
    }
  }

  // Update Ustra --------------------------------------------------------------
  /*
    Functions for updating information
      -> pass updates to ustra, use results to update app.state
  */

  update = (value, path_tag) => {
    let new_state = ustra.update(value, path_tag);
    this.setState({
      truth: new_state
    });
  }


  // render --------------------------------------------------------------------

  renderNavbar = () => {
    return (
      <Navbar/>
    );
  }

  // render <App/> -------------------------------------------------------------

  render() {
    return (
      <div className="App">
        {this.renderNavbar()}
      </div>
    );
  }
}

export default App;
