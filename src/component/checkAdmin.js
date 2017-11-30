import React, { Component } from 'react'
import { connect } from 'react-redux'


class CheckAdmin extends Component {
  render() {
    if (this.props.userAccessLevel === 99) {
      return (
        <div>
          {this.props.children}
        </div>
      )
    } else {
      console.log("Checked not admin");
      return null
    }
  }
}

function mapStateToProps(state) {
  if (state.authentication){
    return {
      userAccessLevel: state.authentication.user.access_level
    }
  }
}

export default connect(mapStateToProps, {})(CheckAdmin);
