import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createBrowserHistory } from 'history'
import { createStore, applyMiddleware, compose } from 'redux'

//check
// import {persistStore, autoRehydrate} from 'redux-persist'

import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { persistStore, autoRehydrate } from 'redux-persist'
import authReducer from './reducers/auth'
import setAuthorizationToken from './utils/setAuthorizationToken'
import { setCurrentUser } from './actions'
import jwt from 'jsonwebtoken'


const history = createBrowserHistory()

export const store = createStore(
	connectRouter(history)(rootReducer),
	composeWithDevTools(
		compose(
    		applyMiddleware(
      			routerMiddleware(history),
      			thunk
      		)
		)
	)
)

//WHEN REFRESH
if(localStorage.jwtToken){
	setAuthorizationToken(localStorage.jwtToken)
	store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

// persistStore(store, {}, () => console.log("Clear before")).purge();
// persistStore(store, {whitelist: [authReducer]}, () => console.log('rehydration complete'))

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter history={history}>
		    <div className="ui raised very padded text container segment">
			 <App/>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

//	<App history={history} />
