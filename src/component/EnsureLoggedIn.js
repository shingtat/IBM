import React, { Component } from 'react'
import { connect } from 'react-redux'
import NoMatch from '../NoMatch'
import NavBar from './NavBar'
import { Route, Switch} from 'react-router-dom'
import EmpsPageGuest from './guests/EmpsPageGuest'


class EnsureLoggedIn extends Component {
  render() {
    if (this.props.loggedIn === true) {
      if (this.props.userAccessLevel === 99) {
        return (
          <div>
            <NavBar/>
            {this.props.children}
          </div>
        )
      } else {
        return (
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/emps/guest" component={EmpsPageGuest} />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        )
      }
    } else {
      return <NoMatch/>
    }
  }
}

function mapStateToProps(state) {
  if (state.authentication) {
    if(state.authentication.user){
      return {
        loggedIn: state.authentication.isAuthenticated,
        userAccessLevel: state.authentication.user.access_level
      }
    }
  }
}

export default connect(mapStateToProps, {}) (EnsureLoggedIn);
