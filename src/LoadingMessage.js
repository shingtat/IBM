import React from 'react'

const LoadingMessage = (props) =>{
  
  return(
    <div className="ui icon message">
      <i className="notched circle loading icon"></i>
      <div className="content">
        <div className="header">
          Just one second
        </div>
        <p>Saving to database....</p>
      </div>
    </div>
  )
}

export default LoadingMessage
