import React, { Component } from "react"
import Button from "react-bootstrap/Button"

export default class UserProjectRow extends Component{
   render(){
      return(
         <tr>
            <td>{this.props.title}</td>
            <td>{this.props.startdate}</td>
            <td>{this.props.enddate}</td>
            <td><Button>Update</Button></td>
         </tr>
      )
   }
}