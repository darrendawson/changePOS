import React, { Component } from 'react';
import './SelectItems.css';

import ImagePicker from '../../../ImagePicker.js';
let __imagePicker = new ImagePicker();

// constants -------------------------------------------------------------------

const __menuItems = [
  {"image": __imagePicker.getFood(0), "name": "Spiffy Tiffy", "description": "Halal chicken, grilled mushrooms, avocado, pesto, provolone and pepper jack. ", "price": 11},
  {"image": __imagePicker.getFood(1), "name": "Matt Cain", "description": "Roast beef, turkey, salami, godfather sauce and provolone.", "price": 11},
  {"image": __imagePicker.getFood(2), "name": "Paul Rueben", "description": "Halal chicken, honey mustard, BBQ sauce, honey, pepper jack, Swiss and cheddar. ", "price": 12},
  {"image": __imagePicker.getFood(3), "name": "Boardwalk", "description": "Roast beef, bacon, creamy horseradish, sriracha and provolone. ", "price": 12},
  {"image": __imagePicker.getFood(4), "name": "Steve Jobs", "description": "Turkey, ham, salami garlic and herb sauce and provolone. ", "price": 10},
  {"image": __imagePicker.getFood(5), "name": "Kryptonite", "description": "Halal chicken, zesty orange glaze, pepper jack and avocado. ", "price": 27},
  {"image": __imagePicker.getFood(6), "name": "Adam Richmond", "description": "Thinly, sliced rib-eye steak, creamy horseradish and gouda. ", "price": 8},
  {"image": __imagePicker.getFood(7), "name": "Oskie", "description": "Vegan chicken teriyaki, wasabi mayo and Swiss. ", "price": 8},
  {"image": __imagePicker.getFood(8), "name": "Sometimes Im a vegetarian", "description": "Avocado, grilled mushrooms, marinara and provolone.  ", "price": 8},
  {"image": __imagePicker.getFood(9), "name": "Sesame Street", "description": "Roast beef, grilled mushrooms, avocado and Swiss. ", "price":15},
  {"image": __imagePicker.getFood(10), "name": "Michael Jordan", "description": "Halal chicken, honey, honey mustard, provolone and havarti.  ", "price": 8},
  {"image": __imagePicker.getFood(11), "name": "Barry Z", "description": "Bacon, lettuce, tomato, avocado and Swiss. ", "price": 8},
]

// =============================================================================
// <SelectItems/>
// =============================================================================

class SelectItems extends Component {

  constructor() {
    super();
  }

  // onClick -------------------------------------------------------------------

  onClick_selectItem = (menuInfo) => {
    let itemObject = {
      "item_name": menuInfo['name'],
      "price": menuInfo['price'],
      "quantity": 1
    };
    this.props.onClick_addItemToOrder(itemObject);
  }

  // render --------------------------------------------------------------------

  // returns true if an item is already in the order
  checkIfItemInOrder = (itemName) => {
    for (let i = 0; i < this.props.currentOrder.length; i++) {
      if (this.props.currentOrder[i]['item_name'] === itemName) {
        return true;
      }
    }
    return false;
  }


  renderItem = (index) => {
    let itemInfo = __menuItems[index];
    let cardCSS = (this.checkIfItemInOrder(itemInfo['name'])) ? "card_selected" : "card_unselected";

    return (
      <div id={cardCSS} onClick={() => this.onClick_selectItem(__menuItems[index])}>
        <div id="item_description_container">
          <h2 style={{'margin': '0px'}}>{itemInfo['name']}</h2>
          <p style={{'margin': '5px', 'text-align': 'left'}}>{itemInfo['description']}</p>
          <h3 style={{'margin': '0px'}}>${itemInfo['price']}</h3>
        </div>
        <div id="item_pic_container">
          <img id="item_img" src={itemInfo['image']}/>
        </div>
      </div>
    );
  }


  renderMenuItems = () => {

    let itemsToRender = [];

    for (let i = 0; i < __menuItems.length; i++) {
      itemsToRender.push(this.renderItem(i));
    }

    return (
      <div id="menu_container">
        {itemsToRender}
      </div>
    );
  }
  // Renders <SelectItems/>
  render() {
    return (
      <div id="SelectItems">
        <div id="title_container">
          <h1 id="title"> >Menu</h1>
        </div>

        {this.renderMenuItems()}
      </div>
    );
  }
}

export default SelectItems;
