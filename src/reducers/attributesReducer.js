
export default function attributes(state = [], action = {}) {
	switch(action.type) {
		case "SET_ATTR":
			return action.attributes
    case "TEST":
      return state;
		default:
			return state;
	}
}
