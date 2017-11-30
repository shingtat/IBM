import { SET_EMPS, ADD_EMP, EMP_FETCHED, EMP_UPDATED, EMP_DELETED, EMP_UPDATE_DELETED_ATTRIBUTE, EMP_UPDATE_FINAL_ATTRIBUTES} from '../actions';

export default function emps(state = [], action = {}) {
	switch(action.type) {
		case ADD_EMP:
			return [
				...state,
				action.emp
			];

		case EMP_DELETED:
			return state.filter(item => item._id !== action.empId);

		case EMP_UPDATED:
			return state.map(item => {
				if (item._id === action.emp._id) return action.emp;
				return item;
			});

		case EMP_FETCHED:
			const index = state.findIndex(item => item._id === action.emp._id);
			if (index > -1) {
				return state.map(item => {
					if (item._id === action.emp._id) return action.emp;
					return item;
				});
			} else {
				return [
				...state,
				action.emp
				]
			}

		case EMP_UPDATE_FINAL_ATTRIBUTES:
			// const index = state.findIndex(emp => emp._id === action.id);
			// console.log("index:" +  index)
			// return [
			// 	...state[index],
			// 	[finalAttributes]: action.finalAttributes
			// ]
			return state.map(item => {
				console.log(action.id)
				console.log(action.finalAttributes)
				if(item._id === action.id) return [...item, action.finalAttributes]
				return item;
			})

		case EMP_UPDATE_DELETED_ATTRIBUTE:
			return state.map(emp => {
				emp.finalAttributes.filter(attributes => {
					return attributes.attribute!==action.deletedAttribute;
				})
			})

		case SET_EMPS:
			return action.emps;

		default:
			return state;
	}
}
