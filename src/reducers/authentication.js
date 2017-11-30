import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from 'lodash/isEmpty'

let initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user.user,
        iat: action.user.iat
      }

      default:
      return state
  }
}
