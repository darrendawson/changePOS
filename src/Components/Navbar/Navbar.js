import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {

  constructor() {
    super();
  }

  // render --------------------------------------------------------------------

  // Renders <Navbar/>
  render() {
    return (
      <div id="Navbar">
        <h1>Change</h1>
        <button id="god_view_button">God View</button>
      </div>
    );
  }
}

export default Navbar;
