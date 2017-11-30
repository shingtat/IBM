import React from 'react';
import PropTypes from 'prop-types'
import EmpEdit from './EmpEdit'


// export default function EmpsList({ emps, deleteEmp }) {
//
// 	const emptyMessage = (
// 		<p>Please wait.</p>
// 	);
//
// 	const empsList = (
// 		<div className="ui middle aligned divided list">
// 		 { 	emps
// 		 	.filter(emp => emp !== undefined )
// 		 	.map( emp => <EmpEdit emp={emp} key={emp._id} deleteEmp={deleteEmp} /> ) }
// 		</div>
// 	);
//
// 	return (
// 		<div>
// 			{emps.length === 0 ? emptyMessage : empsList}
// 		</div>
// 	);
// }
//
// EmpsList.propTypes = {
// 	emps: PropTypes.array.isRequired,
// 	deleteEmp: PropTypes.func.isRequired
// }

class EmpsList extends React.Component {

	state = {
		search: ''
	}

	handleFilter = (e) => {
		this.setState({
			search: e.target.value
		})
	}

	render(){


		const emptyMessage = (
			<p> Please wait... </p>
		)

		var filteredEmps = this.props.emps.filter(emp => {
			 return emp.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
		})

		return (
			<div>
				<div className="ui search">
  				<div className="ui icon input">
    				<input
							className="prompt"
							type="text"
							name = "search"
							value = {this.state.search}
							onChange = {this.handleFilter}
							placeholder="Search User..."
						/>
    				<i className="search icon"></i>
  				</div>
				</div>
				<br/>
				{this.props.emps.length===0 ? emptyMessage :
					<div className="ui two stackable cards">
						{filteredEmps.map((emp)=>{
							return <EmpEdit emp = {emp} key={emp._id} deleteEmp={this.props.deleteEmp} />
						})}
					</div>
				}
			</div>
		)
	}


}

export default EmpsList
