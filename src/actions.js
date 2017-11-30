import axios from 'axios'
import setAuthorizationToken from './utils/setAuthorizationToken'
import jwt from 'jsonwebtoken'

export const SET_EMPS = 'SET_EMPS';
export const ADD_EMP = 'ADD_EMP';
export const EMP_FETCHED = 'EMP_FETCHED';
export const EMP_UPDATED = 'EMP_UPDATED';
export const EMP_DELETED = 'EMP_DELETED';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const EMP_UPDATE_DELETED_ATTRIBUTE = 'EMP_UPDATE_DELETED_ATTRIBUTE';
export const EMP_UPDATE_FINAL_ATTRIBUTES = 'EMP_UPDATE_FINAL_ATTRIBUTES'

function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export function setEmps(emps) {
	return {
		type: SET_EMPS,
		emps
	}
}

export function addEmp(emp) {
	return {
		type: ADD_EMP,
		emp
	}
}

export function empFetched(emp) {
	return {
		type: EMP_FETCHED,
		emp
	}

}

export function empUpdated(emp) {
	return {
		type: EMP_UPDATED,
		emp
	}
}

export function empDeleted(empId) {
	return {
		type: EMP_DELETED,
		empId
	}
}

export function empUpdateDeleteAttribute(deletedAttribute) {
	return {
		type: EMP_UPDATE_DELETED_ATTRIBUTE,
		deletedAttribute: deletedAttribute
	}
}

export function empUpdateFinalAttributes(_id, finalAttributes){
	return{
		type: EMP_UPDATE_FINAL_ATTRIBUTES,
		id: _id,
		finalAttributes: finalAttributes
	}
}

export function setCurrentUser(user){
	return {
		type: SET_CURRENT_USER,
		user: user
	}
}

export function saveEmp(data) {
	return dispatch => {
		// return fetch('/api/emps', {
		// 	method: 'post',
		// 	body: JSON.stringify(data),
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// }).then(handleResponse)
		// .then(data => dispatch(addEmp(data.emp)));
		return axios.post('/api/emps', data)
		.then(res => {
			dispatch(addEmp(res.data))
		})
	}
}

//NOT NEEDED
export function updateEmp(data) {
	return dispatch => {
		// return fetch(`/api/emps/${data._id}`, {
		// 	method: 'put',
		// 	body: JSON.stringify(data),
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// }).then(handleResponse)
		// .then(data => dispatch(empUpdated(data.emp)));
		return axios.put(`/api/emps/${data._id}`, data)
		.then(res => {
			dispatch(empUpdated(res.data.emp))
		})
	}
}

export function deleteEmp(id, rev) {
	const data = { id, rev};
	return dispatch => {
		return fetch(`/api/emps/${data.id}`, {
			method: 'delete',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		.then(data => dispatch(empDeleted(id)));
	}
}

export function fetchEmps() {
	return dispatch => {
		axios.get('/api/emps')
		.then(res => {
			dispatch(setEmps(res.data.emps))
		})
	}

}

export function fetchEmp(id) {
	return dispatch => {
		fetch(`/api/emps/${id}`)
		  .then(res => res.json())
		  .then(data => dispatch(empFetched(data.emp)));
	}
}



//////////////////// For Login ////////////////////////////////////////////////
export function login(form) {
	return dispatch => {
		// return fetch('/api/login', {
		// 	method: 'post',
		// 	body: JSON.stringify(form),
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	}
		// }).then(handleResponse)
		return axios.post('/api/login', form)
		.then(res => {
			const token = res.data.token;
			localStorage.setItem('jwtToken', token)
			setAuthorizationToken(token)
			dispatch(checkLogin(res.data));
			dispatch(setCurrentUser(jwt.decode(token)))
		})

	}
}

export function checkLogin(data) {
	const logInSucc = data === null ? false: true
	return {
		type: LOG_IN,
		logInSucc,
		data
	}
}


export function logout() {
	return dispatch => {

		// removes jwttoken so data is not persisted anymore
		localStorage.removeItem('jwtToken');
		// removes authorization header in future requests
		setAuthorizationToken(false);
		// sets isAuthenticated to false and gets rid of "authentication state"
		dispatch(setCurrentUser({}));
	}
}


export const LOG_IN = "LOG_IN"
