import React, { Component } from 'react';
import './POSPage.css';


// components
import SelectUser from './SelectUser/SelectUser.js';
import PaymentConsole from './PaymentConsole/PaymentConsole.js';
import SelectItems from './SelectItems/SelectItems.js';

// Ustra
import Ustra from '../../Ustra.js';

// import images
import ImagePicker from '../../ImagePicker.js';


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
// Fake Data
// =============================================================================

let __imagePicker = new ImagePicker();


// constants -------------------------------------------------------------------

const __users = [
  {"name": "Darren Dawson", "profilePic": __imagePicker.getHeadshot(0), "phone": "(650) 946-8395", "id": "hiidiw4Oo"},
  {"name": "Vaughn Fisher", "profilePic": __imagePicker.getHeadshot(1), "phone": "(408) 178-8445", "id": "aizeoruX7"},
  {"name": "Alex Starr", "profilePic": __imagePicker.getHeadshot(2), "phone": "(408) 616-2287", "id": "Ahz2eeJoo"},
  {"name": "Collin Hurst", "profilePic": __imagePicker.getHeadshot(3), "phone": "(408) 342-8296", "id": "eech8eiX8"},
  {"name": "Daniel Lee", "profilePic": __imagePicker.getHeadshot(4), "phone": "(650) 403-1452", "id": "iRiej0Ma7"},
  {"name": "Kent McBride", "profilePic": __imagePicker.getHeadshot(5), "phone": "(650) 803-9012", "id": "esaeY6sha"},
  {"name": "Kelly Doyle", "profilePic": __imagePicker.getHeadshot(6), "phone": "(408) 641-1121", "id": "thi6fooQu"},
  {"name": "Max Gordan ", "profilePic": __imagePicker.getHeadshot(7), "phone": "(942) 782-3245", "id": "Ohch4ahl1"},
  {"name": "Jerry Mathews ", "profilePic": __imagePicker.getHeadshot(8), "phone": "(942) 523-2169", "id": "cheiFeex1"},
  {"name": "Amrita Hogans", "profilePic": __imagePicker.getHeadshot(9), "phone": "(650) 991-1851", "id": "Eix5vuegu"},
  {"name": "Jenny Hill", "profilePic": __imagePicker.getHeadshot(10), "phone": "(860) 786-8455", "id": "rai6Goo3V"},
  {"name": "Travis Smith", "profilePic": __imagePicker.getHeadshot(11), "phone": "(942) 662-3421", "id": "jaenoo8Ie"},
  {"name": "Annie Kan", "profilePic": __imagePicker.getHeadshot(12), "phone": "(408) 921-5647", "id": "ooZ0heeHu"},
  {"name": "Cole Henderson", "profilePic": __imagePicker.getHeadshot(13), "phone": "(650) 989-4675", "id": "aXaiwaey9"},
];

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
          <SelectUser
            listOfUsers={__users}
            selectedUserTag={PT_selectedUserID}
            update={this.update}
          />
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
