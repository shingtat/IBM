import React from 'react';
import { Redirect } from 'react-router'
import { connect } from 'react-redux'


class NoMatch extends React.Component {
	render() {

		return (
			<div>
				{
					this.props.loggedIn?
					  (this.props.userAccessLevel === 99 ?
						  <Redirect to="/emps"/> :
							<Redirect to="/emps/guest"/>
						) :
						 	<Redirect to="/login"/>
				}
			</div>
		);
	}
}


function mapStateToProps(state) {
  if (state.authentication) {
    if(state.authentication.user){
      return {
        loggedIn: state.authentication.isAuthenticated,
        userAccessLevel: state.authentication.user.access_level
      }
    }
  }
}

export default connect(mapStateToProps, {})(NoMatch);
