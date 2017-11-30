import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router'
import { saveEmp, fetchEmp, updateEmp, logout, empUpdateFinalAttributes} from '../actions'
import { fetchAttributes } from '../attributesActions'
import EmpForm from './EmpForm'

class EmpFormPage extends React.Component {

	state = {
		redirect: false,
		edit: false
	}

	componentDidMount = () => {
  		if (this.props._id) {
  			this.props.fetchEmp(this.props._id);
  		}
			this.props.fetchAttributes();
  	}

		setRedirect = () => {
			this.setState({redirect: true, edit: true})
		}

  	saveEmp = ({ _id, _rev, fname, lname, username, password, gender, access_level, finalAttributes}) => {
  		if (_id && _rev) {
			return this.props.updateEmp({ _id, _rev, fname, lname, username, password, gender, access_level, finalAttributes})
		} else {
			return this.props.saveEmp({fname, lname, username, password, gender, access_level, finalAttributes})
		}

  	}

	render() {
		console.log("EmpFormPage Attr: " + this.props.attributes);
		return (
			<div>
			  {
			  	this.state.redirect ?
			  	( this.state.edit ? window.location.reload() : <Redirect to="/emps" /> ) :
			  	<EmpForm
			  	  emp={this.props.emp}
			  	  saveEmp={this.saveEmp}
			  	  closeModal={this.props.closeModal}
						attributes={this.props.attributes}
						setRedirect = {this.setRedirect.bind(this)}
						logoutFromForm = {this.props.logout}
						empUpdateFinalAttributes = {this.props.empUpdateFinalAttributes}
			  	 />
			  }
			</div>
		);
	}
}


function mapStateToProps(state, props) {
	if (props._id) {
		return {
			emp: state.emps.find( item => item._id === props._id),
			attributes: state.attributes
		}
	}

	return { emp: null, attributes: state.attributes};
}

export default connect(mapStateToProps, { saveEmp, fetchEmp, updateEmp, fetchAttributes, empUpdateFinalAttributes, logout })(EmpFormPage);
