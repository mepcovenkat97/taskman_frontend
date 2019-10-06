import React, { Component } from "react";
import Button from "react-bootstrap/Button"

export default class UserRow extends Component{
   render(){
      return(
         <tr>
            <td></td>
            <td>{this.props.name}</td>
            <td></td>
            <td></td>
            <td><Button>Update</Button></td>
         </tr>
      )
   }
}