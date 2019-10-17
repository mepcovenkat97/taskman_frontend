import React, { Component } from "react"
import Button from "react-bootstrap/Button"
import { updateTaskStatus } from "../../apis/task"
import { getProjectById } from "../../apis/project";
import UserTaskModal from "../Modals/UserTask/usertask";

export default class UserTaskRow extends Component{

   state = {
      projectname:null,
      showModal:false,
      status:this.props.status,
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
      this.setState({status:"completed"})
      var formdata = [];
      formdata.push(encodeURIComponent('status')+'='+encodeURIComponent("completed"))
      formdata = formdata.toString();
      const res = await updateTaskStatus(this.props.id,formdata);
      this.props.toggleChanged()
   }

   async getProject(){
      try{
         const project = await getProjectById(this.props.project)
         this.setState({projectname:project.data.title})
      }
      catch(e){}
   }
   render(){
      let tbd;
      if(this.state.status === "completed"){
         tbd = (<Button variant="secondary" disabled>Completed</Button>)
      }
      else{
         tbd = (<Button  onClick={this.updateHandler}>Complete</Button>)
      }
      return(
         <tr>
            <td>{this.state.status}</td>
            <td>{this.props.name}</td>
            <td>{this.state.projectname}</td>
            <td>{this.props.priority}</td>
            <td>{this.props.startdate.slice(0,10)}</td>
            <td>{this.props.enddate.slice(0,10)}</td>
            <td><a href="#" onClick={() => this.toggleModel()}>Add (or) View</a></td>
            <td>{tbd}</td>
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