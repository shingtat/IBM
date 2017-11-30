import React from 'react'
import classnames from 'classnames'
import $ from 'jquery'
import { findDOMNode } from 'react-dom'
import Radium from 'radium'
import InputText from './InputText'
import InputRadio from './InputRadio'
import InputNumber from './InputNumber'

var styles = {
	flex: {
		display: "flex"
	},
	attributes_wrapper: {
		paddingTop: "15px",
		paddingBottom: "15px"
	},
	attribute_div: {
		width: "100%",
		paddingTop: "15px",
	},
	attribute_li: {
		fontFamily: "Roboto",
		fontSize: "18px",
		fontWeight: "Bold"
	},
	label: {
		display: "block",
    margin: "0 0 .28571429rem",
    color: "rgba(0,0,0,.87)",
    fontSize: ".92857143em",
    fontWeight: "700",
    textTransform: "none",
		paddingTop: "14px"
	},

	/* property name | duration | timing function | delay */
	remove: {
		color:"red",
		transition: "transform 0.25s linear",
		':hover':{
			transform: "scale(1.3)"
		}
	},
	saveButton: {
		width: "100%",
	}
}

class EmpForm extends React.Component {
	constructor(props) {
   	 super(props);
  	  this.state = {
  	  	_id: this.props.emp ? this.props.emp._id : '',
  	  	_rev: this.props.emp ? this.props.emp._rev : null,
  	  	fname: this.props.emp ? this.props.emp.fname : '',
  	  	lname: this.props.emp ? this.props.emp.lname : '',
		username: this.props.emp ? this.props.emp.username : '',
		access_level: this.props.emp ? this.props.emp.access_level : '',
		password: '',
		gender: '',
		errors: {},
		loading: false,
		edit: this.props.emp ? true : false,
		temp_attribute: '',
		selectedAttributeIndex: 0,
		userAttributes: this.props.emp ? this.props.emp.finalAttributes : [],
		attributes: this.props.attributes ? this.props.attributes : [],
		finalAttributes: [],
		isDropdownOpen: false
		};

		console.log("EmpForm attr: " + this.props.attributes);
 	  this.handleChange = this.handleChange.bind(this);
		this.handleAddAttribute = this.handleAddAttribute.bind(this);
  	}

		componentWillMount = () =>{
			document.addEventListener('click', this.handleDropdown);
		}

		componentWillUnmount = () =>{
			document.removeEventListener('click', this.handleDropdown);
		}


		handleClickOutside(e) {
			if (this.getDOMNode().contains(e.target)) {
					return;
				}
     }

		 componentDidMount = (nextProps) => {
		 console.log("mounted")
		 let newArr = this.state.attributes.map((element)=>{
			 return {...element, list:[]}
		 })
		 this.setState({
			 attributes: newArr
		 })
	 }

  	componentWillReceiveProps = (nextProps) => {
		if(nextProps.attributes){
			let newArr = nextProps.attributes.map((element)=>{
				return {...element, list:[]}
			})
			this.setState({
				attributes: newArr
			})
		}

		if(nextProps.emp){
			this.setState({
				_id: nextProps.emp._id,
				_rev: nextProps.emp._rev,
				fname: nextProps.emp.fname,
				lname: nextProps.emp.lname,
				username: nextProps.emp.username,
				password: nextProps.emp.password,
				access_level: nextProps.emp.access_level,
				gender: nextProps.emp.gender,
				userAttributes: nextProps.emp.finalAttributes
			})
		}

	}

	componentDidUpdate = () => {

		let attributes = this.state.attributes;
		let userAttributes = this.state.userAttributes;
		let finalAttributes = [];

		// MERGE IF BOTH ARRAYS HAVE VALUES
		if(this.state.attributes.length!==0 && this.state.userAttributes.length!==0 && this.state.finalAttributes.length==0){
			console.log("When is this called")
			//CONDITON 1: COMPARES AND SEES IF ATTRIBUTE CAN BE FOUND IN USERATTRIBUTES, IF IT CANT ADD
			for(var i =0; i<attributes.length; i++){
				let index = userAttributes.findIndex(element => element.attribute == attributes[i].attribute)
				if(index==-1){
					finalAttributes.push(attributes[i])
				}
			}

			for(var i=0; i<userAttributes.length; i++){
				let index = attributes.findIndex(element => element.attribute == userAttributes[i].attribute)
				if(index!==-1){
					finalAttributes.push(userAttributes[i])
					}
				}
				this.setState({
					finalAttributes: finalAttributes
				})
			}

			//MERGE IF USERATTRIBUTES IS INITIALLY EMPTY

			else if(this.state.attributes.length!==0 && this.state.userAttributes.length==0 && this.state.finalAttributes.length==0){
				this.setState({
					finalAttributes: attributes
				})
			}

			else if(this.state.attributes.length==0 && this.state.userAttributes.length==0 & this.state.finalAttributes.length==0){
				this.setState({
					finalAttributes: []
				})
			}

			this.props.empUpdateFinalAttributes(this.state._id, this.state.finalAttributes)

		}

	handleChange = (e) => {
		const target = e.target;
		const value = target.value;
		const name = target.name;

		if (!!this.state.errors[e.target.name]) {
			let errors = Object.assign({}, this.state.errors);
			delete errors[e.target.name];
			this.setState({
				[name]: value,
				errors
			});
		} else {
			this.setState({ [name]: value});
		}
	}

	handleEnter = (e) => {
		if(e.key === "Enter"){
			e.preventDefault();
			document.getElementById(e.target.name).click();
		}
	}

	handleSelectedIndex = (e) => {
		let name = e.target.getAttribute('name');
		let value = e.target.getAttribute('data-value');
		this.setState({[name]:value})
	}


	handleSubmit = (e) => {
		e.preventDefault();
		// where save emp is called
		let errors = {};
		if (this.state.fname === '') errors.fname = "First Name can't be empty!";
		if (this.state.lname === '') errors.lname = "Last Name can't be empty!";
		if (this.state.username === '') errors.username = "Username can't be empty!";
		if (this.state.password === '') errors.password = "Password can't be empty!";
		if (this.state.gender === '') errors.gender = "Gender can't be empty!";
		if (this.state.access_level < 0 || this.state.access_level > 99) errors.access_level = "Access Level can't be empty!";
		this.setState({errors});
		const isValid = Object.keys(errors).length === 0

		if (isValid) {
			const { _id, _rev, fname, lname, username, password, gender, access_level, finalAttributes } = this.state;
			this.setState({ loading: true});
			this.props.saveEmp({ _id, _rev, fname, lname, username, password, gender, access_level, finalAttributes})
			.then(() => {
				this.props.setRedirect()
			})
			.catch((err) => {
				this.setState({ errors: err.response.data, loading: false})
				this.props.logoutFromForm();
			})
		}
	}

	handleAddAttribute = (e) => {
		e.preventDefault();
		let attribute = e.target.name;
		let newArr = this.state.finalAttributes.map((element)=>{
			if(element.attribute === attribute){
				let newList = element.list
				newList.push(this.state[`${element.attribute}`])
				return {...element, list: newList}
			}
			return element;
		})
		this.setState({
			finalAttributes: newArr,
			[attribute]:''
		})
	}

	handleDeleteAttribute = (e) => {
		e.preventDefault();
		let params = e.target.getAttribute('name').split(":");
		let attribute = params[0];
		let textToDelete = params[1];
		let newArr = this.state.finalAttributes.map((element)=>{
			if(element.attribute === attribute){
				return {...element, list: element.list.filter(text => text!==textToDelete)}
			}
			return element
		})
		this.setState({
			finalAttributes: newArr
		})
	}

	handleDropdown = (e) => {
		const dropdown = findDOMNode(this.refs.dropdown);
		const dropdown_icon = findDOMNode(this.refs.dropdown_icon);
		const dropdown_text = findDOMNode(this.refs.dropdown_text);
		const menu = findDOMNode(this.refs.menu);
		if((e.target == dropdown || e.target == dropdown_icon || e.target==dropdown_text) && this.state.isDropdownOpen==false){
			$(menu).slideToggle();
			this.setState({
				isDropdownOpen: true
			})
		}
		else if(e.target!=menu && this.state.isDropdownOpen==true){
			$(menu).slideToggle();
			this.setState({
				isDropdownOpen: false
			})
		}
	}

	render() {
		let element = this.state.finalAttributes[this.state.selectedAttributeIndex];

		const form = (
			<form className={classnames('ui', 'form', { loading: this.state.loading})} onSubmit={this.handleSubmit}>
				<h1>Add new Employee</h1>

				<div className="two fields">
					<InputText name = "fname" placeholder = "First Name" value = {this.state.fname} error = {!!this.state.errors.fname} onChange = {this.handleChange}/>
					<InputText name = "lname" placeholder = "Last Name" value = {this.state.lname} error = {!!this.state.errors.lname} onChange = {this.handleChange}/>
 				</div>

				<InputText name = "username" placeholder = "Email" value = {this.state.username} error = {!!this.state.errors.username} onChange = {this.handleChange}/>
				<InputText name = "password" placeholder = "Password" value = {this.state.password} error = {!!this.state.errors.password} onChange = {this.handleChange}/>

				<div className={classnames('inline fields', { error: !!this.state.errors.gender})}>
			  	<label htmlFor="gender">Gender:</label>
					<InputRadio label = "Male" name = "gender" onChange = {this.handleChange} value = "male" checked = {this.state.gender === "male"} />
					<InputRadio label = "Female" name = "gender" onChange = {this.handleChange} value = "female" checked = {this.state.gender === "female"} />
    			<span>{this.state.errors.gender}</span>
 			  </div>

			  <div className={classnames('field', { error: !!this.state.errors.access_level})}>
			  	<label>Access Level</label>
			  	<InputNumber name = "access_level" value = {this.state.access_level} onChange = {this.handleChange} max = "99" min = "0" placeholder = "Integer between 0 and 99" />
			  	<span>{this.state.errors.access_level}</span>
			  </div>

				<div className = "field">
					<label>Attributes</label>
						<div className = "ui fluid selection dropdown" ref = "dropdown">
							<input type = "hidden" name = "user"/>
							<i className = "dropdown icon" ref = "dropdown_icon"></i>
							<div className = "default text" ref = "dropdown_text">Select Attribute </div>
							{this.state.finalAttributes.length==0?<h3> No Attributes Set! </h3>:
								<div className = "menu" ref = "menu">
								{this.state.finalAttributes.map((element,i)=>
									<div name = "selectedAttributeIndex" className = "item" data-value = {i} onClick = {this.handleSelectedIndex}>
										{element.attribute}
									</div>
								)}
								</div>
							}
						</div>
				 {element?
				 <div>
					 <div className = "field">
						 <label key = "dynamic_attribute" style = {styles.label}> {element.attribute} </label>
						 <div key = "input_wrapper" style = {styles.flex}>
							 <input
								 type="text"
								 name={element.attribute}
								 value={this.state[`${element.attribute}`]}
								 onChange={this.handleChange}
								 onKeyPress = {this.handleEnter}
								 placeholder = "Enter Information"
							 />
							 <button id = {element.attribute} className="ui button green" name = {element.attribute} onClick = {this.handleAddAttribute}> Add </button>
						  </div>
					 </div>
					 {element.list?
						 element.list.length===0 ? <br></br> :
							 element.list.map((text,i)=>
							 <div key = {i} style = {styles.attribute_div}>
								 <label>{text}</label>
								 <i key = {i} style = {styles.remove} className="remove circle icon" name= {`${element.attribute}:${text}`} onClick = {this.handleDeleteAttribute}></i>
								 <hr></hr>
							 </div>
						 )
						 :<h1> List field not defined! </h1>
					 }
				 </div>
				 :<h1> No Attribute Set! </h1>
				}
				</div>
			</form>
		);

		const saveButton = (
		 <div className="field">
			 <button key = "saveButton" style = {styles.saveButton} onClick = {this.handleSubmit} className="ui primary button ">Save</button>
		 </div>
		)

		return (
			<div>
				{ form }
				{!!this.state.errors.global && <div className="ui negative message"><p>{this.state.errors.global}</p></div>}
				{ saveButton }
			</div>

		);
	}
}


export default Radium(EmpForm)
