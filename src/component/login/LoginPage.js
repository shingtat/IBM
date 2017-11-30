import React from 'react'
import { connect } from 'react-redux'
// import { Redirect } from 'react-router'
import { login } from '../../actions'
import LoginForm from './LoginForm'
// import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'



class LoginPage extends React.Component {


  login = ({username, password}) => {
    return this.props.login({username, password}).then(
      () => {
         this.props.history.push('/emps')
         console.log("pushing")

      },
    );
  }


  render() {
    console.log("LoginPage: " + this.props.user);
    return (
      <div className="row">
        <div className="col-md-4 col-md-4-offset-4">
          <LoginForm
            login={ this.login }/>
        </div>
      </div>
    )
  }
}

export default withRouter(connect(null, {login})(LoginPage));
