import React, { Component } from 'react';
import './POSPage.css';


// components
import SelectUser from './SelectUser/SelectUser.js';
import PaymentConsole from './PaymentConsole/PaymentConsole.js';
import SelectItems from './SelectItems/SelectItems.js';

// Ustra
import Ustra from '../../Ustra.js';


// =============================================================================
// Ustra
// =============================================================================


// path tags
const PT_selectedUserID = "selectedUserID";

// what App.state will look like
let dataSkeleton = {
  [PT_selectedUserID]: false
};

var ustra = new Ustra(dataSkeleton);

// =============================================================================
// <POSPage/>
// =============================================================================


class POSPage extends Component {

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

  // if a user isn't selected, renders component to allow the cashier to select a user
  // otherwise, render a view that allows cashier to add items to the selected user's order
  renderSelectComponents = () => {
    if (this.state.truth[PT_selectedUserID] === false) {
      return (
        <div className="half_page_container">
          <SelectUser/>
        </div>
      );
    } else {
      return (
        <div className="half_page_container">
          <SelectItems/>
        </div>
      );
    }
  }


  // renders <PaymentConsole/> to show details about a payment and let cashier make transaction
  renderPaymentConsole = () => {
    return (
      <div className="half_page_container">
        <PaymentConsole/>
      </div>
    );
  }

  // Renders <POSPage/>
  render() {
    return (
      <div id="POSPage">
        {this.renderSelectComponents()}
        {this.renderPaymentConsole()}
      </div>
    );
  }
}

export default POSPage;
