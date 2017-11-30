import React, {Component} from 'react'
import {fetchAttributes, addAttributes, updateAttributes} from './attributesActions'
import {empUpdateDeleteAttribute} from './actions.js'
import { connect } from 'react-redux'
import Radium from 'radium'
import { findDOMNode } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import './dist/css/message_box.css'
import SuccessMessage from './SuccessMessage.js'
import ErrorMessage from './ErrorMessage.js'
import LoadingMessage from './LoadingMessage.js'

var styles = {
  container: {
    width: "600px",
    display: "block",
    margin: "0 auto"
  },
  input_wrapper: {
    display: "flex"
  },
  th_width: {
    width: "50%"
  },
  td: {
    padding: "11px",
  },
  input_width: {
    width: "50%"
  },
  add_button:{
    width: "100%"
  },
  input: {
    borderLeft: "none",
    borderTop: "none",
    borderRight: "none",
    outline: "none",
    width: "100%"
  },
  inputBlank: {
    borderLeft: "none",
    borderTop: "none",
    borderRight: "none",
    width: "100%"
  }
}

class EditAttributes extends React.Component {

  componentDidMount(){
    this.props.fetchAttributes();
  }

  componentWillMount(){
    document.addEventListener("click", this.handleResetTable);
  }

  componentWillUnmount(){
    document.removeEventListener("click", this.handleResetTable);
  }

  componentWillReceiveProps = (nextProps) => {
    let newArr = nextProps.attributes;
    let newestArr = newArr.map((element)=>{
      return {...element, "table_view_left":true, "table_view_right":true}
    })
    this.setState({
      table: newestArr
    })

  }

  constructor(props){
    super(props)
    this.state = {
      table: this.props.attributes,
      temp_skill: "",
      temp_access_level:"",
      input_skill:"",
      input_access_level:"",
      loading: false,
      completed: false,
      error: false,
      errors: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleFade = this.handleFade.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleResetTable = (e) => {
    let attribute = e.target.getAttribute("data")
    let table = findDOMNode(this.refs.table)
    if(e.target.tagName=="DIV" || e.target.tagName=="BODY" || e.target.tagName=="H1" || attribute == "addInput"){
      let newArr = this.resetTable();
      this.setState({
        table: newArr
      })
    }
  }

  //ADDS NEW ITEM TO STATE
  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  //UPDATES PARTICULAR ELEMENT IN STATE (USED IN INPUT CHANGES)
  handleInputChange = (e) => {
    let newArr = this.state.table.map((element,i)=> {
      if(e.target.id==i){
        return {...element, [e.target.name]:e.target.value}
      }
      return element
    })
    this.setState({
      table: newArr
    })
  }

  //ADDS NEW ATTRIBUTE TO STATE
  handleAdd = (e) => {
    var a = this.state.temp_skill;
    var b = this.state.temp_access_level;
    var obj = {"attribute":a, "access_level":b, "table_view_left":true, "table_view_right":true}
    this.setState({
      table: [...this.state.table, obj],
      temp_skill: "",
      temp_access_level: ""
    })
  }

  //WHEN ENTER IS CLICKED FOR ADDING AN ATTRIBUTE, ADDS AUTOMATICALLY TO TABLE
  handleKeyPress = (e) => {
    if(e.key == "Enter"){
      document.getElementById("addButton").click();
      document.getElementById("temp_skill").focus();
    }
  }

  //WHEN ENTER IS PRESSED ON A CELL, RETURNS TO TABLE FORM
  handleInputKeyPress = (e) =>{
    if(e.key == "Enter"){
      let newArr = this.resetTable()
      this.setState({
        table: newArr
      })
    }
  }

  //FOCUSES ON WHAT CELL WAS CLICKED AND DISPLAYS INPUT TEXT
  handleEditClick = (e) => {
    let newArr = this.state.table.map((element, i)=>{
      let table_view = e.target.title;
      let table_view_opposing = e.target.title=="table_view_left"?"table_view_right":"table_view_left";
      if(i==e.target.id){
        let obj = {...element, [table_view]:false, [table_view_opposing]:true}
        return obj
      }
      let obj = {...element, [table_view]:true, [table_view_opposing]:true}
      return obj
    })
    this.setState({
      table: newArr
    })
  }

  //RETURNS TO TABLE FORM
  resetTable = () => {
    return this.state.table.map((element)=>{
      let obj = {...element,"table_view_left":true, "table_view_right":true }
      return obj
    })
  }

  saveAttributes = (data) => {
    let newArr = data.map((element)=>{
      let obj = {"attribute": element.attribute, "access_level":element.access_level}
      return obj
    })
    let date = new Date().getTime();
    let finalArr = {attributes: newArr, time_stamp: date}
    this.setState({loading: true})
    let promise = this.props.updateAttributes(finalArr);
    return promise;
  }

  saveWrapper = (data) => {
    let error = false;
    data.map((element)=>{
      if(element.access_level<0 || element.access_level > 99){
        error = true;
        this.setState({error: true, errors: "Access Level must be within 0 and 99 inclusive!"})
      }
    })

    if(!error){
      this.saveAttributes(data)
      .catch((err)=>{
        err.response.json();
        this.setState({error: true})
      })
      .then(()=>{
        this.setState({loading: false, completed: true})
      })
      // .then(()=>{
      //   this.props.empUpdateDeleteAttribute();
      // })
    }
  }

//HANDLES DELETION OF ROW
  handleDeleteRow = (e) => {
    let newArr = this.state.table.filter((element)=>{return element.attribute!==e.target.name})
    this.setState({table: newArr})
  }

//HANDLES AUTOMATIC FADE
  handleFade = () => {
    setTimeout(()=>{this.setState({completed: false, error: false})},5000);
  }

//HANDLES CLOSE FOR MESSAGE BOXES
  handleClose = () => {
    this.setState({completed:false, error: false})
  }

  render(){

    const page = (
      <div style = {styles.container}>
        <h1> Edit Attributes </h1>
        <table ref = "table" id = "attributes_table" className="ui celled table">
          <thead>
            <tr>
              <th style = {styles.th_width}>Attribute</th>
              <th style = {styles.th_width}>Access Level</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
          {this.state.table.map((element, i)=>{
            if(element.table_view_left===true && element.table_view_right===true){
              return(
                <tr id = {element.attribute?element.attribute:"null"}>
                  <td id = {i} title = "table_view_left" className = "selectable" onClick = {this.handleEditClick} style={styles.td}> {element.attribute} </td>
                  <td id = {i} title = "table_view_right" className = "selectable" onClick = {this.handleEditClick} style={styles.td}> {element.access_level} </td>
                  <td> <button name = {element.attribute?element.attribute:"null"} className = "ui button red" onClick = {this.handleDeleteRow}> Delete </button> </td>
                </tr>
              )
            }else if(element.table_view_left===false && element.table_view_right===true){
              return(
                <tr id = {element.attribute?element.attribute:"null"}>
                  <td id = {i} title = "table_view_left" className = "selectable" onKeyPress = {this.handleInputKeyPress} style={styles.td}>
                    <input style = {styles.input} id = {i} name="attribute" type = "text" value = {this.state.table[i].attribute} onChange = {this.handleInputChange} />
                  </td>
                  <td id = {i} title = "table_view_right" className = "selectable" onClick = {this.handleEditClick} style={styles.td}> {element.access_level}</td>
                  <td> <button name = {element.attribute?element.attribute:"null"} className = "ui button red" onClick = {this.handleDeleteRow}> Delete </button> </td>
                </tr>
              )
            }else{
              return(
                <tr id = {element.attribute?element.attribute:"null"}>
                  <td id = {i} title = "table_view_left" className = "selectable" onClick = {this.handleEditClick} style={styles.td}> {element.attribute}</td>
                  <td id = {i} title = "table_view_right" className = "selectable" onKeyPress = {this.handleInputKeyPress} onClick = {this.handleEditClick} style={styles.td}>
                    <input style = {styles.input} id = {i} name="access_level" type = "number" min = "0" max = "99" value = {this.state.table[i].access_level} onChange = {this.handleInputChange} />
                  </td>
                  <td> <button name = {element.attribute?element.attribute:"null"} className = "ui button red" onClick = {this.handleDeleteRow}> Delete </button> </td>
                </tr>
              )
            }
          })}
          <tr>
            <td>
              <input
                data = "addInput"
                style = {styles.input}
                type = "text"
                name = "temp_skill"
                value = {this.state.temp_skill}
                onChange = {this.handleChange}
                id = "temp_skill"
                placeholder = "Enter Attribute"
              />
            </td>
            <td>
              <input
                data = "addInput"
                style = {styles.input}
                type = "number"
                min = "0"
                max = "99"
                placeholder="Integer between 0 and 99"
                name = "temp_access_level"
                value = {this.state.temp_access_level}
                onChange = {this.handleChange}
                onKeyPress = {this.handleKeyPress.bind(this)}
              />
            </td>
            <td>
              <button className="positive ui button" style = {styles.add_button} onClick = {this.handleAdd} id = "addButton">Add </button>
            </td>
          </tr>
          </tbody>
        </table>
        <button className="primary ui button" style = {styles.add_button} onClick = {()=>this.saveWrapper(this.state.table)}>Save </button>
      </div>
    )

    return (
      <div>
        {this.state.loading==false?'':<LoadingMessage/>}
        <ReactCSSTransitionGroup
          transitionName="message_box"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={700}>
          {this.state.error==false?'':<ErrorMessage handleFade={this.handleFade} handleClose={this.handleClose} errors = {this.state.errors}/>}
          {this.state.completed==false?'':<SuccessMessage handleFade={this.handleFade} handleClose={this.handleClose}/>}
        </ReactCSSTransitionGroup>
        {page}
      </div>
    )
  }
}
  function mapStateToProps(state){
    return {
      attributes : state.attributes
    }
  }
  export default Radium(connect(mapStateToProps, {fetchAttributes, addAttributes, updateAttributes, empUpdateDeleteAttribute })(EditAttributes))
