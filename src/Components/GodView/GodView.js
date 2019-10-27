import React, { Component } from 'react';
import './GodView.css';

// API requests
import ChangeAPI from '../../ChangeAPI.js';
let changeAPI = new ChangeAPI();


class GodView extends Component {

  constructor() {
    super();

    this.state = {
      "transactions": [],
      "numOmitted": 0
    }
  }

  async componentDidMount() {
    let transactions = [];
    let results = await changeAPI.getAllTransactions();
    for (let i = 0; i < 150; i++) {
      transactions.push(
        {
          "transaction_id": results[i][0],
          "user_id": results[i][1],
          "store_id": results[i][2],
          "store_name": results[i][3],
          "store_location": JSON.stringify(results[i][4]),
          "cash_amount": results[i][7],
          "change_amount": results[i][8],
          "time": JSON.stringify(results[i][9])
        }
      );
    }
    this.setState({transactions: transactions, numOmitted: results.length - 150});
  }

  // render --------------------------------------------------------------------

  renderNumOmitted = () => {
    if (this.state.numOmitted === 0) {
      return (
        <h3>Loading...</h3>
      );
    } else {
      return (
        <h3 id="num_omitted_text">+ {this.state.numOmitted} more</h3>
      );
    }
  }

  // renders an individual row in the table
  renderRow = (transactionObject) => {
    return (
      <div className="row">
        <p className="row_text">{transactionObject['user_id']}</p>
        <p className="row_text">{transactionObject['store_name']}</p>
        <p className="row_text">{transactionObject['store_location']}</p>
        <p className="row_text">{transactionObject['cash_amount']}</p>
        <p className="row_text">{transactionObject['change_amount']}</p>
        <p className="row_text">{transactionObject['time']}</p>
      </div>
    );
  }

  // renders the table
  renderTable = () => {
    let rows = [];
    for (let i = 0; i < this.state.transactions.length; i++) {
      rows.push(this.renderRow(this.state.transactions[i]));
    }

    return (
      <div id="table_container">
        <div className="row">
          <h3 className="row_text">customerID</h3>
          <h3 className="row_text">store name</h3>
          <h3 className="row_text">address</h3>
          <h3 className="row_text">cash paid</h3>
          <h3 className="row_text">change</h3>
          <h3 className="row_text">time</h3>
        </div>
        <div style={{'height': '2px', 'width': '100%', 'background-color': '#b7b7b7'}}></div>
        {rows}
        {this.renderNumOmitted()}
      </div>
    );
  }


  // Renders <GodView/>
  render() {
    return (
      <div id="GodView">
        {this.renderTable()}
      </div>
    );
  }
}

export default GodView;
