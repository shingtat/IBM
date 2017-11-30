
import React from 'react'

class ErrorMessage extends React.Component{
  componentDidMount(){
    this.props.handleFade();
  }

  render(){
    return(
      <div>
        <div className="ui error message">
          <i className="close icon" onClick = {()=>{this.props.handleClose()}}></i>
          <div className="header">
            There were some errors with your submission
          </div>
          <ul className="list">
            <li>Please check your internet connection.</li>
            <li>Try again later.</li>
            <li>{this.props.errors}</li>
          </ul>
        </div>
        <br></br>
      </div>
    )
  }
}

export default ErrorMessage
