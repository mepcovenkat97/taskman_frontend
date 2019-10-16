import React, { Component } from "react";
import Button from "react-bootstrap/Button"
import TaskModal from "../Modals/Task/task";
import Badge from 'react-bootstrap/Badge'

export default class TaskRow extends Component{


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
      else if(this.props.status == "on going")
      {
         statusflag = (<Badge variant="success">On Going</Badge>)
      }
      else if(this.props.status == "not started")
      {
         statusflag = (<Badge variant="secondary">Not Started</Badge>)
      }
      let project,projectid,user,userid;
      //project = this.props.project.name;
      //user = this.props.assignedto.name;
      if(this.props.project == null)
      {
         project = " - "
         projectid = null
      }
      else
      {
         project = this.props.project.title;
         projectid = this.props.project._id
      }
      if(this.props.assignedto == null)
      {
         user = " - "
         userid = null
      }
      else
      {
         user = this.props.assignedto.name;
         userid = this.props.assignedto._id;
      }
      return(
         <tr>
            <td>{statusflag}</td>
            <td>{this.props.name}</td>
            <td>{project}</td>
            <td>{user}</td>
            <td>{this.props.startdate.slice(0,10)}</td>
            <td>{this.props.enddate.slice(0,10)}</td>
            <td>{this.props.priority}</td>
            <td>{this.props.message.length}</td>
            <td><Button onClick={() => this.toggleModel()}>Update</Button></td>
            <TaskModal
               id = {this.props.id}
               name = {this.props.name}
               status = {this.props.status}
               project = {project}
               projectid = {projectid}
               user = {user}
               userid = {userid}
               message = {this.props.message}
               priority = {this.props.priority}
               show = {this.state.showModal} 
               onHide = {this.toggleModel}
               changed = {this.props.changed}
            />
         </tr>
      )
   }
}