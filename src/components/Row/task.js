import React, { Component } from "react";
import Button from "react-bootstrap/Button"
export default class TaskRow extends Component{
   render(){
      let project,user;
      project = this.props.project.title;
      user = this.props.assignedto;
      return(
         <tr>
            <td></td>
            <td>{this.props.name}</td>
            <td>{project}</td>
            <td>{user}</td>
            <td>
              
            </td>
            <td><Button>Update</Button></td>
         </tr>
      )
   }
}