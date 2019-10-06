import React,{ Component } from "react";
import Button from "react-bootstrap/Button"

export default class TeamRow extends Component{
   render(){
      return(
         <tr>
            <td></td>
            <td>{this.props.name}</td>
            <td>{this.props.project}</td>
            <td>{this.props.user.length}</td>
            <td><Button>Update</Button></td>
         </tr>
      )
   }
}