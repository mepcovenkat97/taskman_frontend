import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import { updateTaskStatus } from "../../apis/task"

export default class UserTaskRow extends Component{

   updateHandler = async() =>{
      var formdata = [];
      formdata.push(encodeURIComponent('status')+'='+encodeURIComponent("completed"))
      formdata = formdata.toString();
      const res = await updateTaskStatus(this.props.id,formdata);
   }
   render(){
      let tbd;
      if(this.props.status === "completed"){
         tbd = (<Button disabled>Completed</Button>)
      }
      else{
         tbd = (<Button onClick={this.updateHandler}>Completed</Button>)
      }
      return(
         <tr>
            <td>{this.props.name}</td>
            <td>{this.props.project}</td>
            <td>{this.props.priority}</td>
            <td>{this.props.status}</td>
            <td>{tbd}</td>
         </tr>
      )
   }
}