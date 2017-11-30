# IBM Internal Responsive App

README.md

***Current Status***
1.  Working version located at reactv5 at documents/IBM/reactv5 folder

2.  Stable version in staging branch of project, however JWT authentication in not fully deployed

3.  Refactor branch is still work in process, with JWT authentication placed

***Running Project***
1.  Open up terminal of choice (iTerm or Terminal)

2.  Navigate to backend folder and type "npm install" then “npm start"

3.  Create a new tab and navigate to main folder and type "npm install" then “npm start”

4.  Navigate to http://localhost:3000

5.  First command starts the backend server while the second command starts the react script


**Entry Point and Flow of Data**
* Index.js
  * App.js
    * EmpsPage
      * EmpsList
        * EmpEdit (Specific employee information passed in as props)
          * EmpFormPage
            * EmpsForm
              * InputNumber
              * InputRadio
              * InputText
    * EmpFormPage (Can get redirected)
  * NoMatch.js
  * EnsureLoggedIn.js
    * NavBar.js
    * EmpsPageGuest

**Folder Structure**
* Backend
* Config
  * Stores passport information
* Public
  * Must contain index.html in a public folder outside of src here otherwise React project won’t run
  * Treats it as a valid entry point for React
* Src
  * Actions
  * Component
  * Dist
    * Convention where static assets should be placed
  * Reducers
  * Utils (for JWT)
  * Dns (for JWT, needed to install a new package.json otherwise the verify method won’t jwt.verify method won’t run)


  **Explanation of Individual Files**
  #### Table of Contents:
  1. [Index.js](#Index.js)
  2. [App.js](#App.js)
  3. [EmpsList](#EmpsList)
  4. [EmpsEdit](#EmpsEdit)
  5. [EmpsFormPage](#EmpsFormPage)
  6. [EmpsForm](#EmpsForm)
  7. [Input Types](#Input-Types)
  8. [No Match/Ensure Logged In](#No-Match/Ensure-Logged-In)
  9. [EmpsGuestPage](#EmpsGuestPage)
  7. [JWT Explanation](#JWT-Explanation)
  8. [Understanding ES6 Reducer Syntax/Functions](#Understanding-ES6-Reducer-Syntax/Functions)

#### Index.js:
* Where store is initialized.
* connectRouter(history)(rootReducer) basically gives the history objects and makes the different states from the different reducers available to the Router.
* All the different reducers are combined together in the “rootReducer” file using the combineReducer function.
* composeWithDevTools is a function that allows all the different states and props to be shown in the google chrome inspector. (Must install the google chrome extension for both react and redux)
* applyMiddleware is a function that executes first whenever the store is called. So whenever there is about to be a change in the store, it runs the middleware functions before it applies the changes to the store.
  * Thunk is a middleware library that enables functions, instead of actions to get returned to the action creator, which in turns passes on to the reducers.
    * Thunk in essence allows us to make asynchronous requests as seen in the actions.js and attributeActions.js files
* ReactDom.render is the reason why we see everything we see
  * It is the ultimate entry point that passes down all the states we have defined in the reducer files to all our components
  * It does this by encapsulating all child components in the Provider component and passing it the store. (<Provider store={store}>)
  * BrowserHistory essentially enables us Client Side Routing. Since some of the routing such as the NavLink is not done by the Server, React needs to be able to keep track of routing itself. For example, how does it know what components to render if the link is “localhost/emps” or “localhost/attributes”

[Back to Table of Contents](#table-of-contents)

#### App.js

App.js
* Where all the routes are maintained
  * So if the route is exactly ‘/login’ then we render the Login Component
* State in app.js not needed but double check!
* Whether or not we are logged in and how we ensure that “localhost/emps” is not accessible if we are not logged in is controlled by a component called “EnsureLoggedIn” and “NoMatch”. “NoMatch” component is a child component of “EnsureLoggedIn”
* Both get the “authentication” reducer states passed onto it. mapStateToProps is a function that defines what reducer states to pass onto the components (in this case, the states of authentication). But the “connect” function is what passes the states to the component as props. Connect can take two functions and a component. The first function is mapStateToProps and the second is mapDispatchToProps where we can pass on functions to change the states in the store as props.
* Specifically, NoMatch is a component that checks whether user is logged in and if logged in user is the admin with an access level of 99 (DEALS WITH REDIRECTION)
  * EnsureLoggedIn is a component that determines (WHAT TO RENDER)
* EMPSPAGE
  * Where fetch emps is called and where EMPSLIST is rendered
  * EmpPage.propTypes = {emps: …} is just a function that ensures that the prop called emps gets passed in an array or there will be an error
  * fetchEmps and deleteEmps are asynchronous calls that gets called to the respective server endpoints. Usually action creators can only return actions, but in this case we are returning a function because thunk middle ware is used here
    * So for example in the case of fetchEmps(), we use the axios library to send a GET request to the server. (server.js)
    * Server.js uses some cloudant api methods and res.json({emp: emp.docs}) returns a list of employers
    * If successful, a resolved promise get’s returned from the first axios.get call and we call .then. .then() executes immediately upon a successful promise and we call the setEmps function (an action creator) which returns an action. The dispatcher then sends that action to the appropriate reducer.
    * In this case, the reducer is emps.js inside the reducers folder. What happens now is based on the action.type, we can run different functions.
    * SetEmps essentially just returns the whole response to the server and sends the state of empsReducer to the response.
    * Other functions include updating particular information of a user or deleting a user in an array.
    * Specific actions know which reducer state to change by importing specific actions in the specific reducer functions.  

[Back to Table of Contents](#table-of-contents)

#### EmpsList
*	Uses filteredEmps and map to return a new “EMPEDIT” with props emp, key, deleteEmp implemented
* Unique keys are important because libraries like “Radium” use keys to determine what CSS should get applied to what component

[Back to Table of Contents](#table-of-contents)

#### EmpEdit
* What this renders are the individual employee boxes
* Running the constructor(props) function is important if we need to bind a method to a component or if we need to use “this.props” in the constructor
* We have to call this.openModal = this.openModal.bind(this) so that the method knows that the state we are altering is the state of the current component where the method is defined. (In this case, EmpEdit)
* In this project, we are using semantic ui react for our styling

[Back to Table of Contents](#table-of-contents)

#### EmpsFormPage
* This is a container component that passes information to the presentational component, EMPFORM
* Has 2 functions, setRedirect and saveEmp
* Must be aware that the function name “saveEmp” also has the same name as the props function, “saveEmp”
  * Local saveEmp method in the component EMPSFORMPAGE determines whether to run an “update” method or a “save” employer method that will write to the cloudant database and change the emps redux state
  * If we pass in ```“_id”```and ```“_rev”```, then Cloudant knows to change an existing record
  * But if don’t pass in one, Cloudant will automatically generate one and treat it as a new entry

[Back to Table of Contents](#table-of-contents)

#### EmpsForm
* Using ```const{_id, rev, fname…} = this.state``` is a syntax that basically means set a new variable ```id = this.state._id```
* Be aware that this.props.saveEmp is calling the EMPSFORMPAGE saveEmp method
* Must initially set state to either empty string or null because it gives us the ability to have loading states.
* ```componentDidUpdate()``` is a crucial function here.
  * It is called whenever there is a new change that will cause re-rendering
  * What happens is it matches up which components got added or which components got removed in the attributes, and selectively renders those deleted/new attributes in the attributes section of the user in the form
* Wrap Radium(EmpForm) so that we have hover states, transition CSS available to us

[Back to Table of Contents](#table-of-contents)

#### Input Types
* INPUTTEXT, INPUTNUMBER, INPUTRADIO are all just different input components

[Back to Table of Contents](#table-of-contents)

#### No Match/Ensure Logged In
* Both components control what happens depending on whether a user is logged in or not
  * NOMATCH primarily controls redirection
  * ENSURELOGGEDIN primarily controls what components to display

[Back to Table of Contents](#table-of-contents)

#### EmpsGuestPage
* Similar to EMPSLIST but just no edit forms. Guest view

[Back to Table of Contents](#table-of-contents)

#### JWT Explanation
* Javascript Web Token is a secure way of maintaining authorization and routes in your application
* Basic Flow:
  * When you log in and get authenticated securely
    * You create a new token with a json object enclosed in it and secure it with a jwtSecret key that only the server knows
      * During this stage, you can also set the expiration of the token
    * You then send the token back to the client (in login() action.js)
    * Then set the token in localStorage
    * Call the setAuthorizationToken(token) which is found in utils
      * Basically sets the header of every request sent here on out to have the authorization header
      * So whatever future API requests you make, the authorization header with the token will be there.
    * When you dispatch setCurrentUser(jwt.decode(token)), you basically SETTHECURRENTUSER in the redux state.
    * Then in index.js, you have this method where you check whether localStorage has this token. If it does, you set the authorization headers again. You do this in index.js because when you refresh the page, index.js is what runs.
    * Then to secure your routes in the backend, you make a authenticate.js file in the middlewares folder. This is where you verify the token and makes sure the authentication works. You pass this function as a middleware in your api endpoints, in this case, app.put(‘/api/emps/:id’). So before your server calls does the Cloudant query, it executes authenticate function first.

[Back to Table of Contents](#table-of-contents)

#### Understanding ES6 Reducer Syntax/Functions
* ... is the spread syntax, basically copies the old state and copies it to a new array

```
case EMP_FETCHED:
  const index = state.findIndex(item => item.id === action.emp._id);
  if(index > -1){
    return state.map(item => {
      if(item.id === action.emp._id) return action.emp;
      return item;
      });
  }
  else{
    return [
    ...state,
    action.emp
    ]
  }
```
* Very common way to update state.
  * If item.id===action.id, you return the new item
  * But if it is not, you return the same item to a new array

[Back to Table of Contents](#table-of-contents)
