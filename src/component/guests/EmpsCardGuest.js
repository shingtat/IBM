import React from 'react';
import PropTypes from 'prop-types'

//import from semantic ui
import { Accordion, Icon } from 'semantic-ui-react'


class EmpCardGuest extends React.Component {

	render() {

	//Get the according attr from user's profile
	var filteredEmpAttributes = []
	for (var i = 0; i < this.props.attrName.length; i++) {
 	 var filteredEmpAttr = this.props.emp.finalAttributes.filter(empAttr => {
 	 	  return empAttr.attribute === this.props.attrName[i]
 	 })
  filteredEmpAttributes.push(filteredEmpAttr)
 }

 console.log(filteredEmpAttributes)

 // 	 console.log("EmpsCardGuest filteredEmpAttributes:\n" , filteredEmpAttributes );

let list = [];
for (var i = 0; i < filteredEmpAttributes.length; i++) {
	 filteredEmpAttributes[i].forEach((item) => {
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
 }

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
					</div>
				</div>
		);
	}
}

EmpCardGuest.propTypes = {
	emp: PropTypes.object.isRequired
}

export default EmpCardGuest;



/*
<Accordion.Title>
	<Icon name='dropdown' />
	{filteredUserAttrName}
</Accordion.Title>
<Accordion.Content>
	<p>HELLO</p>
</Accordion.Content>*/





/*
<div className="item">
 <div className="header"> </div>
	<div className="ui styled container">
		<div className = "ui styled accordion">
			<div className ="active title">
				<i className="dropdown icon"></i>
				{this.props.emp.username}
				</div>

			<div className="content">
				<p className="transition hidden">A dog is a type of domesticated animal. </p>
			</div>
		</div>
	</div>
</div>
*/




 /*
 		 let list = [];

items.forEach((i) => {
list.push(<AccordionTitle>{i.title}</AccordionTitle>);
list.push(<AccordionBody>{i.body}</AccordionBody>);
})

<Accordion>
{list}
</Accordion>
 */
