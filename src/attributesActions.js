
var constants = {
  SET_ATTR: "SET_ATTR",
  TEST: "TEST"

}

function handleResponse(response) {
	if (response.ok) {
		return response.json();
	} else {
		let error = new Error(response.statusText);
		error.response = response;
		throw error;
	}
}

export function fetchAttributes() {
	return dispatch => {
		return fetch('/api/attributes')
		  .then(res => res.json())
		  .then(data => dispatch(setAttributes(data.attributes)));
	}
}

export function addAttributes(data) {
	return dispatch => {
		return fetch('/api/attributes', {
			method: 'post',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		.then(data => dispatch(test(data.emp)));
	}
}


export function updateAttributes(data) {
  console.log(data)
	return dispatch => {
		return fetch('/api/attributes', {
			method: 'put',
			body: JSON.stringify(data),
			headers: {
				"Content-Type": "application/json"
			}
		}).then(handleResponse)
		.then(data => dispatch(test(data.emp)));
	}
}

export function setAttributes(attributes) {
	return {
		type: constants.SET_ATTR,
		attributes: attributes
	}
}

export function test() {
	return {
		type: constants.TEST
	}
}
