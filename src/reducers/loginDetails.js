import { LOG_IN } from '../actions';


export default function loginDetails(state = [], action = {}) {
  switch (action.type) {
    case LOG_IN:
    if (action.data === undefined) {
      return;
    } else {
      return action.data;
    }

    default: return state

  }


}
