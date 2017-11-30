
import React from 'react'
import classnames from 'classnames'

class InputText extends React.Component{

  state = {
    error: this.props.error,
    value: this.props.value,
  }

  componentWillReceiveProps = (nextProps) => {
    // console.log("nextProps!")
    // console.log(nextProps)
    this.setState({
      error: nextProps.error,
      value: nextProps.value
    })
  }

  render(){
    return(
      <div className={classnames('field', { error: this.state.error})}>
       <label>{this.props.placeholder}</label>
         <input
           id={this.props.name}
           placeholder={this.props.placeholder}
           type="text"
           name={this.props.name}
           value={this.state.value}
           onChange={this.props.onChange}
           onKeyPress = {this.props.onKeyPress}
         />
       </div>
    )
  }

}

export default InputText
