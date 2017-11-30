import React, {Component} from 'react'
import classnames from 'classnames'

export class LoginForm extends Component {

//initialising the state
constructor(props, context) {
  super(props, context)
  this.state={
    username: '',
    password: '',
    errors: {},
    isLoading: false
  }
  this.handleChange = this.handleChange.bind(this);
  this.handleLogin = this.handleLogin.bind(this)
}

//invoked immediately before rendering when new props or state are being received.
// componentWillUpdate(nextProps, nextState) {
//   nextState.empty = !(nextState.username && nextState.password);
// }

handleChange(event) {
  const input = event.target.name;
  this.setState({
    [input]: event.target.value
  });
}

handleLogin(event){
  event.preventDefault() //So the page does not refresh

  let errors = {};
  if (this.state.username === '') errors.username = "Username can't be empty!";
  if (this.state.password === '') errors.password = "Password can't be empty!";
  this.setState({errors});
  const isValid = Object.keys(errors).length === 0

  if (isValid) {
    const {username, password} = this.state;
    this.setState({ errors:{}, isLoading: true});
    this.props.login({username, password})
    .catch((err) => {
      console.log(err)
      this.setState({
        errors: err.response.data.errors,
        loading: false
      })
    })
  }
  console.log('username: '+ this.state.username + ' \npassword: ' + this.state.password);


}
  render() {
    const form = (
      <form className="ui form">
      {!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
            <div className={classnames('field', { error: !!this.state.errors.username})}>
            <label>Username</label>
            <input type="text"
              placeholder="Username"
              name = "username"
              value={this.state.username}
              onChange={this.handleChange}/>
              <span>{this.state.errors.username}</span>
              </div>

            <div className={classnames('field', { error: !!this.state.errors.password})}>
              <label>Password</label>
              <input type="password"
                placeholder="Password"
                name = "password"
                value={this.state.password}
                onChange={this.handleChange}/>
                <span>{this.state.errors.password}</span>
                </div>
            <button onClick={this.handleLogin}>Login</button>
    </form>
    )
    return (
      <div>
        <img alt ="cloudant" src={'./cloudant_ibm.png'}/>
        {form}
      </div>
    );
  }
}


export default LoginForm;
