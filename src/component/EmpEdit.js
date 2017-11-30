import React from 'react';
import PropTypes from 'prop-types'
import Modal from 'react-modal'
import Form from './EmpFormPage'
import { Accordion, Icon } from 'semantic-ui-react'

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    overflow              : 'scroll',
    height:'80%'
  }
};
//export default function EmpEdit({ emp, deleteEmp }) {
class EmpEdit extends React.Component {
	constructor(props) {
   	 super(props);
   	 this.state = { modalIsOpen: false }
   	 this.openModal = this.openModal.bind(this);
     this.closeModal = this.closeModal.bind(this);
   	}
   	openModal() {
    	this.setState({modalIsOpen: true});
      document.body.style.overflow = "hidden"
  	}
  	closeModal() {
    	this.setState({modalIsOpen: false});
      document.body.style.overflow = "auto"
  	}

	render() {
    //To fetch the attributes for display in Employees Page
    var empAttrs = this.props.emp.finalAttributes
    let list = [];
       empAttrs.forEach((item) => {
         if (item.list.length !== 0){
         list.push(
           <Accordion.Title>
            <Icon name='dropdown' />
              {item.attribute}
           </Accordion.Title>);
         let sublist = [];
         item.list.forEach((subItem) => {
           sublist.push(<li>{subItem}</li>)
         })
         list.push(<Accordion.Content>{sublist}</Accordion.Content>)
       }
       })


		return (
      <div className="card">
			  <div className="content">
            <img className="right floated mini ui image" src="/profileImages/02.png"/>
					  <div className="header">{this.props.emp.username} </div>
					  <div className="meta"> IBM Employee</div>
      			<div className="description">
              <Accordion styled>
                {list}
              </Accordion>
            </div>
			  <div className="right floated content">
					<div className="ui two buttons">
						<div className="ui basic blue button" onClick={this.openModal}>Edit</div>
    							<Modal
    							  id={this.props.emp._id}
        					  isOpen={this.state.modalIsOpen}
        					  onRequestClose={this.closeModal}
        					  style={customStyles}
        					  contentLabel="Edit Modal"
            			>
        					  <Form _id={this.props.emp._id} closeModal={this.closeModal} />
        					</Modal>

       		 			<div id={this.props.emp._id} className="ui basic red button" onClick={() => this.props.deleteEmp(this.props.emp._id, this.props.emp._rev)}>Delete</div>
      				</div>
    			</div>
          </div>
			</div>
		);
	}
}

EmpEdit.propTypes = {
	emp: PropTypes.object.isRequired,
	deleteEmp: PropTypes.func.isRequired
}

export default EmpEdit;
