import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import { updateTaskStatus } from "../../apis/task"
import { getProjectById } from "../../apis/project";
import UserTaskModal from "../Modals/UserTask/usertask";

export default class UserTaskRow extends Component{

   state = {
      projectname:null,
      showModal:false,
   }
   
   toggleModel = () => {  
      const show = !this.state.showModal;
      this.setState({showModal:show});
   }

   componentDidMount()
   {
      this.getProject()
   }
   updateHandler = async() =>{
      var formdata = [];
      formdata.push(encodeURIComponent('status')+'='+encodeURIComponent("completed"))
      formdata = formdata.toString();
      const res = await updateTaskStatus(this.props.id,formdata);
   }

   async getProject(){
      try{
         const project = await getProjectById(this.props.project)
         //console.log(project.data)
         this.setState({projectname:project.data.title})
      }
      catch(e){}
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
            <td>{this.state.projectname}</td>
            <td>{this.props.priority}</td>
            <td>{this.props.status}</td>
            <td>{tbd}</td>
            <td><Button onClick={() => this.toggleModel()}>Add Message</Button></td>
            <UserTaskModal
               name = {this.props.name}
               id={this.props.id}
               messageid = {this.props.messageid}
               show = {this.state.showModal} 
               onHide = {this.toggleModel}
            />
         </tr>
      )
   }
}