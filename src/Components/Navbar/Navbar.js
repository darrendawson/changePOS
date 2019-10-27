import React, { Component } from 'react';
import './Navbar.css';

import __img_changeLogo from '../../Images/Logo/change_logo_small.png';

class Navbar extends Component {

  constructor() {
    super();
  }

  // render --------------------------------------------------------------------

  // Renders <Navbar/>
  render() {
    return (
      <div id="Navbar">
        <div style={{'display': 'flex', 'align-items': 'center'}}>
          <img id="logo" src={__img_changeLogo}/>
          <h1>Change <span style={{'color': '#b7b7b7'}}>POS</span></h1>
        </div>
        <button id="god_view_button">God View</button>
      </div>
    );
  }
}

export default Navbar;
