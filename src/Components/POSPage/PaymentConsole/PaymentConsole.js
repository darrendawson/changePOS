import React, { Component } from 'react';
import './PaymentConsole.css';

class PaymentConsole extends Component {

  constructor() {
    super();

    this.state = {
      cashInputExpanded: false,
      customerTipping: false
    }
  }


  // calculates the total cost of the purchase
  getTotalCost = () => {
    let total = 0;
    for (let i = 0; i < this.props.orderDetails.length; i++) {
      total += (this.props.orderDetails[i]['price'] * this.props.orderDetails[i]['quantity']);
    }
    total = (108 / 100) * total;
    return total;
  }

  // onClick -------------------------------------------------------------------

  // lets user modify the amount of cash being given
  onClick_cashInput = (buttonPress) => {

    // if user clicked a digit, add it to the end of the cash amount
    if (["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].indexOf(buttonPress) >= 0) {
      let newCashAmount;
      if ((this.props.cashGiven.length === 1) && (this.props.cashGiven[0] === "0")) {
        newCashAmount =  buttonPress;
      } else {
        newCashAmount =  this.props.cashGiven + buttonPress;
      }
      this.props.onClick_updateCashAmount(newCashAmount);

    // if a user clicked the delete button, remove the last digit
    } else if (["x", "X"].indexOf(buttonPress) >= 0) {
      if (this.props.cashGiven.length > 1) {
        let newCashAmount = this.props.cashGiven.substring(0, this.props.cashGiven.length - 1);
        this.props.onClick_updateCashAmount(newCashAmount);
      } else if (this.props.cashGiven.length === 1) {
        this.props.onClick_updateCashAmount("0");
      }
    }
  }


  // render --------------------------------------------------------------------

  // renders title bar with customer name and cancel order button
  renderTitleBar = () => {
    return (
      <div id="title_row">
        <div style={{'display': 'flex'}}>
          <h1 id="title_text">Customer:</h1>
          <h1 id="customer_name">{this.props.customerName}</h1>
        </div>
        <button id="cancel_button" onClick={this.props.onClick_cancelOrder}>cancel</button>
      </div>
    );
  }


  // shows information about the order (like a receipt)
  renderOrderDetails = () => {

    let ordersToRender = [];
    let runningTotal = 0;

    // calculate individual order details
    for (let i = 0; i < this.props.orderDetails.length; i++) {

      let priceForItem = this.props.orderDetails[i]['price'] * this.props.orderDetails[i]['quantity'];
      runningTotal += priceForItem;

      ordersToRender.push(
        <div className="order_item_row">
          <p className="order_item_text">{this.props.orderDetails[i]['item_name']}</p>
          <p className="order_item_text">{this.props.orderDetails[i]['price']}</p>
          <p className="order_item_text">{this.props.orderDetails[i]['quantity']}</p>
          <p className="order_item_text">{priceForItem}</p>
        </div>
      );
    }

    // calculate tax
    let tax = (8/100) *runningTotal;
    runningTotal += tax;

    //
    return (
      <div className="section_container">
        <h1 className="section_title">Order Details</h1>
        <div className="order_item_row_legend">
          <p className="order_item_text_legend">Item</p>
          <p className="order_item_text_legend">Price</p>
          <p className="order_item_text_legend">Quantity</p>
          <p className="order_item_text_legend">Total</p>
        </div>
        {ordersToRender}

        <div className="order_item_row">
          <p className="order_item_text">Sales Tax</p>
          <p className="order_item_text"></p>
          <p className="order_item_text"></p>
          <p className="order_item_text">{Math.round(tax * 100) / 100}</p>
        </div>

        <h1 className="section_title">Total</h1>
        <div className="order_item_row">
          <p className="order_item_text"></p>
          <p className="order_item_text"></p>
          <p className="order_item_text"></p>
          <h1 className="order_item_text">${Math.round(runningTotal * 100) / 100}</h1>
        </div>
      </div>
    );
  }


  // render cash ---------------------------------------------------------------

  // renders an area so cashier can see / input how much cash someone is using
  renderCashDetails = () => {

    let activate_cash_button_css = (this.state.cashInputExpanded) ? "activate_cash_button_active": "activate_cash_button";

    return (
      <div className="section_container">
        <h1 className="section_title">Customer Cash</h1>
        <div className="center_column">
          <button
            id={activate_cash_button_css}
            onClick={() => this.setState({cashInputExpanded: !this.state.cashInputExpanded})}>
            ${this.props.cashGiven}
          </button>

          {this.renderCashInput()}
        </div>
      </div>
    );
  }

  renderCashInput = () => {
    if (this.state.cashInputExpanded) {
      return (
        <div id="cash_input_container">
          <div className="cash_input_row">
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("1")}>1</button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("2")}>2</button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("3")}>3</button>
          </div>

          <div className="cash_input_row">
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("4")}>4</button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("5")}>5</button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("6")}>6</button>
          </div>

          <div className="cash_input_row">
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("7")}>7</button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("8")}>8</button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("9")}>9</button>
          </div>

          <div className="cash_input_row">
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("0")}>0</button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput(" ")}></button>
            <button className="cash_input_button" onClick={() => this.onClick_cashInput("x")}>x</button>
          </div>
        </div>
      );
    }
  }


  // render Change -------------------------------------------------------------


  renderChange = () => {
    let totalCost = this.getTotalCost();
    let cashGiven = parseFloat(this.props.cashGiven);

    if (totalCost > cashGiven) {

      let change = totalCost - cashGiven;

      return (
        <div className="section_container">
          <h1 className="section_title">Change</h1>
          <div className="center_column">
            <p className="change_text">{this.props.customerName} will pay {this.props.storeName} <span className="green_text">${Math.round(change * 100) / 100}</span></p>
          </div>
        </div>
      );
    } else if (totalCost < cashGiven) {

      let change = cashGiven - totalCost;
      return (
        <div className="section_container">
          <h1 className="section_title">Change</h1>
          <div className="center_column">
            <p className="change_text">{this.props.storeName} will pay {this.props.customerName} <span className="red_text">${Math.round(change * 100) / 100}</span></p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="section_container">
          <h1 className="section_title">Change</h1>
          <div className="center_column">
            <p className="change_text">(No change)</p>
          </div>
        </div>
      );
    }
  }


  // if a customer is getting change back from the store, they have the option to tip it to the cashier instead
  renderTip = () => {
    let totalCost = this.getTotalCost();
    if (totalCost < this.props.cashGiven) {

      let noTipCSS = "tip_button_active";
      let yesTipCSS = "tip_button_inactive";
      if (this.state.customerTipping) {
        noTipCSS = "tip_button_inactive";
        yesTipCSS = "tip_button_active"
      }

      return (
        <div className="section_container">
          <h1 className="section_title">Tip</h1>
          <div style={{'width': '100%', 'display': 'flex', 'justify-content': 'center'}}>
            <button className={noTipCSS} onClick={() => this.setState({customerTipping: false})}>No Tip</button>
            <button className={yesTipCSS} onClick={() => this.setState({customerTipping: true})}>Tip</button>
          </div>
        </div>
      );
    }
  }



  renderCompleteTransaction = () => {
    return (
      <div id="footer_row">
        <div style={{'width': '100%', 'height': '2px', 'background-color': '#efefef'}}></div>
        <button id="complete_payment_button" onClick={this.props.onClick_finishTransaction}>Complete Transaction</button>
      </div>
    );
  }
  // render <PaymentConsole/> --------------------------------------------------

  // Renders <PaymentConsole/>
  render() {
    return (
      <div id="PaymentConsole">
        {this.renderTitleBar()}
        <div id="scroll_container">
          {this.renderOrderDetails()}
          {this.renderCashDetails()}
          {this.renderChange()}
          {this.renderTip()}
        </div>
        {this.renderCompleteTransaction()}
      </div>
    );
  }
}

export default PaymentConsole;
