
import React from 'react'
import classnames from 'classnames'

class InputNumber extends React.Component{

  render(){
    return(
      <input
         id={this.props.name}
         type="number"
         name={this.props.name}
         value={this.props.value}
         onChange={this.props.onChange}
         max={this.props.max}
         min={this.props.min}
         placeholder={this.props.placeholder}
       />
    )
  }
}

export default InputNumber
