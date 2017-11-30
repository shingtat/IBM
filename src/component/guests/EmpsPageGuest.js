import React from 'react'
import EmpsListGuest from './EmpsListGuest'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchEmps } from '../../actions'
import { fetchAttributes } from '../../attributesActions'
import { Redirect } from 'react-router'

class EmpsPageGuest extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			filteredAttributes: null
		}
	}

	componentDidMount() {
			this.props.fetchEmps();
			this.props.fetchAttributes()
			.then((data) =>
			{
					let allAttributes = data.attributes;
					let filteredAttributes = allAttributes.filter(attr => {
						return attr.access_level <= this.props.loginUser.access_level
					})
					console.log("filtered")
					console.log(filteredAttributes)
					this.setState({
						filteredAttributes: filteredAttributes
					})
			});
			// .then(data => this.setState({
			// 	filteredAttributes: data.attributes
			// }))
	}


	render() {
		// //To filter the attributes depending on the users' access level
		// 	if (this.props.loggedIn) {
		// 		if(filteredAttr!=null){
		// 			console.log("not null")
		// 			var filteredAttr = this.state.filteredAttributes
		// 			.filter(attr => {
		// 				return attr.access_level <= this.props.loginUser.access_level
		// 			})
		// 			console.log(filteredAttr)
		// 		}
		// 	}
		// console.log("EmpsPage attr: %j", filteredAttr);

		return (
			<div>
			{this.props.loggedIn?
			<div>
				<h1>Employees Page</h1>
				<EmpsListGuest emps={this.props.emps} attributes={this.state.filteredAttributes}/>
			</div> :
			<Redirect to="/login"/>
			}
			</div>
		);
	}
}

EmpsPageGuest.propTypes = {
	emps: PropTypes.array.isRequired,
	fetchEmps: PropTypes.func.isRequired,
	fetchAttributes: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	if (state.auth) {
		return {
			loggedIn: state.auth,
			loginUser: state.loginDetails.loginEmp,
			emps: state.emps,
			attributes: state.attributes
		}
	}
	// return {emps: state.emps}
}

export default connect(mapStateToProps, {fetchEmps, fetchAttributes})(EmpsPageGuest);
