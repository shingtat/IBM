
import axios from 'axios'

export default function setAuthorizationToken(token){
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    console.log("delete authorization")
    delete axios.defaults.headers.common['Authorization'];
  }
}
