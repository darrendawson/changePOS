import React, { Component } from 'react';
import './UserCard.css';


// =============================================================================
// <UserCard/>
// =============================================================================

class UserCard extends Component {

  constructor() {
    super();
  }

  // render --------------------------------------------------------------------

  // Renders <UserCard/>
  render() {
    return (
      <div id="UserCard" onClick={() => this.props.onClick_selectUser(this.props.id)}>
        <img id="headshot" src={this.props.profileImg}/>
        <div id="info_container">
          <h1 id="name_text">{this.props.name}</h1>
          <div id="boundary_line"></div>
          <h2 id="phone_text">{this.props.phone}</h2>
        </div>
      </div>
    );
  }
}

export default UserCard;
