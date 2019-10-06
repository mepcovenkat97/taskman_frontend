import React, { Component } from "react";
import Button from "react-bootstrap/Button"
export default class ProjectRow extends Component{
   render(){
    
      return(
         <tr>
            <td></td>
            <td>{this.props.title}</td>
            <td></td>
            <td></td>
            <td>{this.props.startdate}</td>
            <td>{this.props.enddate}</td>
            <td><Button>Update</Button></td>
         </tr>
      )
   }
}