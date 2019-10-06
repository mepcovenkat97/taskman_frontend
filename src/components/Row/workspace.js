import React, { Component } from "react";
import { Button } from "reactstrap";

export default class WorkspaceRow extends Component
{
   render(){
      let status;
      let team;
      let project;
      if(this.props.name && this.props.teamassigned){
         team = this.props.teamassigned.name
         project = this.props.projectassigned.title
         status = (<label> Assigned </label>)
      }
      else
      {
         status = (<label> Unassigned</label>)
      }
      return(
         <tr>
            <td>{this.props.name}</td>
            <td>{project}</td>
            <td>{team}</td>
            <td>
              {status}
            </td>
         </tr>
      )
   }
}