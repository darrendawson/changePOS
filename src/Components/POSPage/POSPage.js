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

// API requests
import ChangeAPI from '../../ChangeAPI.js';
let changeAPI = new ChangeAPI();


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
// Ustra
// =============================================================================



// path tags
const PT_selectedUserID = "selectedUserID";
const PT_customerOrder = "customerOrder";
const PT_cashGiven = "cashGiven";

// what App.state will look like
let dataSkeleton = {
  [PT_selectedUserID]: false,
  [PT_customerOrder]: [],
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
    this.update([], PT_customerOrder);
  }

  // when the cashier clicks on a menu item, it adds that to the current order
  onClick_addItemToOrder = (itemObject) => {
    let orders = this.state.truth[PT_customerOrder];
    let itemInOrderAlready = false;
    for (let i = 0; i < orders.length; i++) {
      if (orders[i]['item_name'] === itemObject['item_name']) {
        itemInOrderAlready = true;
        orders[i]['quantity'] += 1;
      }
    }
    if (! itemInOrderAlready) {
      orders.push(itemObject);
    }
    this.update(orders, PT_customerOrder);
  }

  // updates the amount of cash a customer is expected to give
  // -> this amount is a string and will be converted to an int later
  onClick_updateCashAmount = (newAmount) => {
    if (this.state.truth[PT_cashGiven] !== newAmount) {
      this.update(newAmount, PT_cashGiven);
    }
  }

  onClick_finishTransaction = () => {
    this.finishTransaction();
  }


  // API calls -----------------------------------------------------------------

  async api_finishTransaction() {
    let result = await changeAPI.createTransaction();
    console.log(result);
  }

  async api_getAllTransactionsForUser() {
    let result = await changeAPI.getUserTransactions();
    console.log(result);
  }

  async api_getAllTransactionsForStore() {
    let result = await changeAPI.getStoreTransactions();
    console.log(result);
  }

  async api_getAllTransactions() {
    let result = await changeAPI.getAllTransactions();
    console.log(result);
  }

  async api_getUserBankAccount() {
    let result = await changeAPI.getUserBankAccount();
    console.log(result);
  }

  async api_getUserProfile() {
    let result = await changeAPI.getUserProfile();
    console.log(result);
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
          <SelectItems
            currentOrder={this.state.truth[PT_customerOrder]}
            onClick_addItemToOrder={this.onClick_addItemToOrder}
          />
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
            onClick_finishTransaction={this.onClick_finishTransaction}
          />
        </div>
      );
    } else {
      if (false) {
        return (
          <div className="half_page_container">
            <div id="empty_payment_console">
              <button className="test_button" onClick={this.api_getAllTransactions}>/get/transactions</button>
              <button className="test_button" onClick={this.api_getAllTransactionsForUser}>/get/transactions/user</button>
              <button className="test_button" onClick={this.api_getAllTransactionsForStore}>/get/transactions/store</button>
              <button className="test_button" onClick={this.api_getUserProfile}>/get/user/profile</button>
              <button className="test_button" onClick={this.api_getUserBankAccount}>/get/user/bankaccount</button>
              <button className="test_button" onClick={this.api_finishTransaction}>/do/transaction</button>
            </div>
          </div>
        );
      } else {
        return (
          <div className="half_page_container">
            <div id="empty_payment_console">
              <img style={{'width': '260px'}} src={__imagePicker.getChangeLogo()}/>
            </div>
          </div>
        );
      }

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
