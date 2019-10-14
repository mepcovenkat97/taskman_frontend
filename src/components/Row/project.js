import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import ProjectModal from "../Modals/Project/updateProjectModal";
import Badge from 'react-bootstrap/Badge'


export default class ProjectRow extends Component{

   state = {
      showModal:false,
   }
   
   toggleModel = () => {  
      const show = !this.state.showModal;
      this.setState({showModal:show});
   }

   render(){
      let statusflag;
      if(this.props.status == "incomplete")
      {
         statusflag = (<Badge variant="danger">incomplete</Badge>)
      }
      else if(this.props.status == "on Going")
      {
         statusflag = (<Badge variant="success">On Going</Badge>)
      }
      else if(this.props.status == "not Started")
      {
         statusflag = (<Badge variant="secondary">Not Started</Badge>)
      }
      return(
         <tr>
            <td>{statusflag}</td>
            <td>{this.props.title}</td>
            <td>{this.props.workspace}</td>
            <td>{this.props.team}</td>
            <td>{this.props.startdate}</td>
            <td>{this.props.enddate}</td>
            <td><Button onClick={() => this.toggleModel()}>Update</Button></td>
            <ProjectModal
               id = {this.props.id}
               title = {this.props.title}
               workspace = {this.props.workspace}
               team = {this.props.team}
               teamid = {this.props.teamid}
               startdate = {this.props.startdate}
               enddate = {this.props.enddate}
               show = {this.state.showModal}
               changed = {this.props.changed}
               onHide = {this.toggleModel}
            />
         </tr>
      )
   }
}