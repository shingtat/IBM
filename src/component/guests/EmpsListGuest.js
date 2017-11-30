import React from 'react';
import PropTypes from 'prop-types'
import EmpsCardGuest from './EmpsCardGuest'


class EmpsListGuest extends React.Component {

	state = {
		search: '',
		attributes: ''
	}

	handleFilter = (e) => {
		this.setState({
			search: e.target.value
		})
	}

	componentWillReceiveProps = (nextProps) => {
		this.setState({
			attributes: nextProps.attributes
		})
	}

	constructor(props){
		super(props)
		console.log(this.props)
	}

	render(){

		const emptyMessage = (
			<p> Please wait... </p>
		)

		var filteredEmps = this.props.emps.filter(emp => {
			 return emp.username.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
		})

		//To filter the attr. that should be shown
		if(this.state.attributes){
			var filteredAttrName = this.state.attributes.map((attr) => {
				return attr.attribute
			})
		}

			// console.log("EmpsListGuest: %j", filteredAttrName );

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
				{this.props.emps.length===0 || !this.state.attributes? emptyMessage :
					<div className="ui two stackable cards">
						{filteredEmps.map((emp)=>{
							return <EmpsCardGuest emp={emp} key={emp._id} attrName={filteredAttrName} />
						})}
					</div>
				}
			</div>
		)
	}


}

export default EmpsListGuest
