import React from 'react'
import EmpsList from './EmpsList'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchEmps, deleteEmp } from '../actions'
// import { fetchAttributes } from '../attributesActions'

class EmpsPage extends React.Component {
	componentDidMount() {
			this.props.fetchEmps();
	}

	render() {
		return (
			<div>
				<h1>Employees Page</h1>
				<EmpsList emps={this.props.emps} deleteEmp={this.props.deleteEmp}  />
			</div>
		);
	}
}

EmpsPage.propTypes = {
	emps: PropTypes.array.isRequired,
	fetchEmps: PropTypes.func.isRequired,
	deleteEmp: PropTypes.func.isRequired,
	fetchAttributes: PropTypes.func.isRequired
}

function mapStateToProps(state) {
	if (state.auth) {
	return {
		emps: state.emps,
	}
}
}

export default connect(mapStateToProps, {fetchEmps, deleteEmp})(EmpsPage);
