import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// components
import Navbar from './Components/Navbar/Navbar.js';
import POSPage from './Components/POSPage/POSPage.js';


// =============================================================================
// <App/>
// =============================================================================

class App extends Component {

  constructor() {
    super();
  }



  // render --------------------------------------------------------------------

  // renders the navbar
  renderNavbar = () => {
    return (
      <Navbar/>
    );
  }

  // either renders <GodViewPage/> or <POSPage/>
  renderPage = () => {
    return (
      <div id="page_container">
        <POSPage/>
      </div>
    );
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
