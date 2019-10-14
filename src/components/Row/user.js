import React, { Component } from "react";
import Button from "react-bootstrap/Button"

export default class UserRow extends Component{
   render(){
      return(
         <tr>
            <td>{this.props.type}</td>
            <td>{this.props.name}</td>
            <td>{this.props.email}</td>
            <td>{this.props.task}</td>
            {/* <td><Button>Update</Button></td> */}
         </tr>
      )
   }
}