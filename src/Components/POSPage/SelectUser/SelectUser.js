import React, { Component } from 'react';
import './SelectUser.css';

import UserCard from './UserCard/UserCard.js';


// =============================================================================
// <SelectUser/>
// =============================================================================

class SelectUser extends Component {

  constructor() {
    super();
  }

  // onClick -------------------------------------------------------------------

  onClick_selectUser = (userID) => {
    this.props.update(userID, this.props.selectedUserTag);
  }

  // render --------------------------------------------------------------------

  renderUsers = () => {

    let usersToRender = [];

    for (let i = 0; i < this.props.listOfUsers.length; i++) {
      usersToRender.push(
        <UserCard
          id={this.props.listOfUsers[i]['id']}
          name={this.props.listOfUsers[i]['name']}
          profileImg={this.props.listOfUsers[i]['profilePic']}
          phone={this.props.listOfUsers[i]['phone']}
          onClick_selectUser={this.onClick_selectUser}
        />
      );
    }

    return usersToRender;
  }


  // Renders <SelectUser/>
  render() {
    return (
      <div id="SelectUser">
        <div id="title_container">
          <h1 id="title"> >Select a Customer</h1>
        </div>

        <div id="users_container">
          {this.renderUsers()}
        </div>
      </div>
    );
  }
}

export default SelectUser;
