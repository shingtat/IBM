
import React from 'react'
import classnames from 'classnames'

class InputRadio extends React.Component{

  state = {
    checked: this.props.checked
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      checked: nextProps.checked
    })
  }

  render(){
    return(
    <div className="field">
      <div className="ui radio checkbox">
      <input
        type="radio"
        name={this.props.name}
        onChange={this.props.onChange}
        value={this.props.value}
        checked={this.state.checked}
       />
      <label>{this.props.label}</label>
      </div>
     </div>
    )
  }

}

export default InputRadio
