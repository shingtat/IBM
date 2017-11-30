import { combineReducers } from 'redux';

import emps from './reducers/emps';
import auth from './reducers/auth';
import loginDetails from './reducers/loginDetails';
import attributes from './reducers/attributesReducer'
import authentication from './reducers/authentication'

export default combineReducers({
	emps,
	auth,
	loginDetails,
	attributes,
	authentication
});
