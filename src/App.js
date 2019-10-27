import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// components
import Navbar from './Components/Navbar/Navbar.js';
import POSPage from './Components/POSPage/POSPage.js';
import GodView from './Components/GodView/GodView.js';


// =============================================================================
// <App/>
// =============================================================================

class App extends Component {

  constructor() {
    super();
    this.state = {
      "currentPage": "pos"
    }
  }

  // onClick -------------------------------------------------------------------

  onClick_togglePage = () => {
    if (this.state.currentPage === "pos") {
      this.setState({"currentPage": "god"});
    } else if (this.state.currentPage === "god") {
      this.setState({"currentPage": "pos"});
    }
  }


  // render --------------------------------------------------------------------

  // renders the navbar
  renderNavbar = () => {
    return (
      <Navbar
        currentPage={this.state.currentPage}
        onClick_togglePage={this.onClick_togglePage}
      />
    );
  }

  // either renders <GodViewPage/> or <POSPage/>
  renderPage = () => {
    if (this.state.currentPage === "pos") {
      return (
        <div id="page_container">
          <POSPage/>
        </div>
      );
    } else {
      return (
        <div id="page_container">
          <GodView/>
        </div>
      );
    }

  }


  // render <App/> -------------------------------------------------------------

  render() {
    return (
      <div className="App">
        {this.renderNavbar()}
        {this.renderPage()}
      </div>
    );
  }
}

export default App;
