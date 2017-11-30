
import jwt from 'jsonwebtoken'
import jwtConfig from '../jwtConfig'

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;
  console.log("in authenticate bitches")
  if(authorizationHeader){
    token = authorizationHeader.split(' ')[1];
  }
  if(token){
    jwt.verify(token, jwtConfig.jwtSecret, (err, decoded) => {
      if(err){
        console.log(err)
        res.status(401).json({global: "Token has expired!"})
      } else {
        // should authenticate local token user with user on database to see if it exists or if user has been deleted since last user login
        req.currentUser = decoded.user;
        next();
      }
    })
  }else{
    res.status(403).json({
      global: "Error: Forbidden access, no token provided!"
    })
  }
}
