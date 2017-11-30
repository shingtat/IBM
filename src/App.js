import React, { Component } from 'react'

import EmpsPage from './component/EmpsPage'
import EmpFormPage from './component/EmpFormPage'
import EditAttributes from './EditAttributes'
import NoMatch from './NoMatch'
import LoginPage from './component/login/LoginPage'
import NavBar from './component/NavBar'
import { Route, Switch } from 'react-router-dom'
import {store} from './index'
import EnsureLoggedIn from './component/EnsureLoggedIn'
import { persistStore } from 'redux-persist'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hasLoggedIn: false,
      rehydrated: false
    };

  }

  // componentWillMount() {
  //   persistStore(store, {}, () => {
  //     this.setState({ rehydrated: true })
  //   })
  // }


  render() {
    // if (!this.state.rehydrated) {
    //   return <h1>Loading...</h1>
    // }

    return (
      <div className="ui container">
      <Switch>
      <Route exact path="/login" component={LoginPage}/>
          <EnsureLoggedIn>
            <Switch>
            <Route exact path="/emps" component={EmpsPage} />
            <Route exact path="/emps/new" component={EmpFormPage} />
            <Route exact path="/emps/:_id" component={EmpFormPage}/>
            <Route exact path="/attributes" component={EditAttributes}/>
            <Route exact path="/logout"/>
            <Route component={NoMatch}/>
            </Switch>
          </EnsureLoggedIn>
          <Route component={NoMatch}/>
      </Switch>

      </div>
    );
  }
}

export default App




/*
//         <div className="ui grey secondary pointing inverted menu">
//           <ActiveLink activeOnlyWhenExact to="/" label="Home" />
//           <ActiveLink activeOnlyWhenExact to="/emps" label="Employees" />
//           <ActiveLink activeOnlyWhenExact to="/emps/new" label="Add New Emp" />
//           <ActiveLink activeOnlyWhenExact to="/attributes" label="Edit Attributes" />
//           <div className="right menu">
//             <ActiveLink activeOnlyWhenExact to="/logout" label="Logout" />
//           </div>
//         </div>
//          <Switch>
//            <Route exact path="/" component={Home}/>
//            <Route exact path="/emps" component={EmpsPage}/>
//            <Route path="/emps/new" component={EmpFormPage}/>
//            <Route path="/emps/:_id" component={EmpFormPage}/>
//            <Route exact path="/attributes" component = {EditAttributes}/>
//            <Route path="/logout" />
//            <Route component={NoMatch}/>
//          </Switch>
//
// >>>>>>> attributes*/
