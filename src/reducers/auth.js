import { LOG_IN } from '../actions';

export default function logins(state = [], action = {}) {
  switch (action.type) {
    case LOG_IN:
    return action.logInSucc;

    default: return state

  }
}
