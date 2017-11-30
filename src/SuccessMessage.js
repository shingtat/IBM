import React from 'react'

class SuccessMessage extends React.Component{
  componentDidMount(){
    this.props.handleFade();
  }

  render(){
    return(
      <div>
        <div key = "success_message" className="ui success message">
          <i className="close icon" onClick = {()=>{this.props.handleClose()}}></i>
          <div className="header">
            Success!
          </div>
          <p>Saving new information to database was successful.</p>
        </div>
        <br></br>
      </div>
    )
  }
}

export default SuccessMessage
