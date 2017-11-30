import React, { Component } from 'react'
// import { Redirect } from 'react-router'
import { logout } from '../actions'
import {NavLink, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import { persistStore } from 'redux-persist'
import {store} from '../index'
// import authReducer from '../reducers/auth'
import empsReducer from '../reducers/emps'
import CheckAdmin from './checkAdmin'



class NavBar extends Component {

  logOut(e) {
    e.preventDefault();
    this.props.logout()
    // .then(
    //   () => {
    //     persistStore(store, {empsReducer}, () => console.log("purged")).purge()
    //     window.location.reload();
    //     this.props.history.push('/login')
    //   }
    // );
  }

  render() {
    // <Redirect to="/emps"/>
    return (
        <div className="ui text menu">
            <CheckAdmin>
            <div className="ui text menu">
              <NavLink exact activeClassName="active disabled" className="item" to="/emps">Employees</NavLink>
              <NavLink exact activeClassName="active disabled" className="item" to="/emps/new">Add New Emp</NavLink>
              <NavLink exact activeClassName="active disabled" className="item" to="/attributes">Edit Attributes</NavLink>
            </div>
            </CheckAdmin>
          <div className="ui right text menu">
            <NavLink exact activeClassName="active" className="item" to="/login" onClick={ this.logOut.bind(this) }>Logout</NavLink>
          </div>
        </div>
    );
  }
}

export default withRouter(connect(null, {logout}) (NavBar))
