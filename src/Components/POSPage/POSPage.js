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

const __orders = [
  {"item_name": "Burrito", "price": 12.3, "quantity": 1},
  {"item_name": "milkshake", "price": 5.0, "quantity": 2},
];



// =============================================================================
// Ustra
// =============================================================================



// path tags
const PT_selectedUserID = "selectedUserID";
const PT_customerOrder = "customerOrder";
const PT_cashGiven = "cashGiven";

// what App.state will look like
let dataSkeleton = {
  [PT_selectedUserID]: false,
  [PT_customerOrder]: __orders,
  [PT_cashGiven]: "0"
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

  // onClick -------------------------------------------------------------------

  // cancels a user and resets <POSPage/> state
  onClick_cancelOrder = () => {
    this.update(false, PT_selectedUserID);
    this.update("0", PT_cashGiven);
  }

  // updates the amount of cash a customer is expected to give
  // -> this amount is a string and will be converted to an int later
  onClick_updateCashAmount = (newAmount) => {
    if (this.state.truth[PT_cashGiven] !== newAmount) {
      this.update(newAmount, PT_cashGiven);
    }
  }

  // get -----------------------------------------------------------------------

  // returns the currently selected user
  getCurrentlySelectedUser = () => {
    if (this.state.truth[PT_selectedUserID] !== false) {
      // search for user with the right ID
      for (let i = 0; i < __users.length; i++) {
        if (__users[i]['id'] === this.state.truth[PT_selectedUserID]) {
          return __users[i];
        }
      }
    }
    return false;
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

    let selectedUser = this.getCurrentlySelectedUser();
    if (selectedUser !== false) {
      return (
        <div className="half_page_container">
          <PaymentConsole
            storeName="Ike's Sandwiches"
            customerName={selectedUser.name}
            orderDetails={this.state.truth[PT_customerOrder]}
            cashGiven={this.state.truth[PT_cashGiven]}
            onClick_cancelOrder={this.onClick_cancelOrder}
            onClick_updateCashAmount={this.onClick_updateCashAmount}
          />
        </div>
      );
    } else {
      return (
        <div className="half_page_container">
          <div id="empty_payment_console">
          </div>
        </div>
      );
    }

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
