import React,{ Component } from "react";
import { Table } from 'reactstrap';
import { getUser } from '../../apis/storage';
import { getAllTask } from "../../apis/task";
import UserTaskRow from "../Row/usertaskrow";
export default class UserTask extends Component{
   constructor(props){
      super(props);
      this.state = {
         tasks:[],
         changed:null
      }
   }

   componentDidMount(){
      this.getUserTaskDetails()
   }

   async getUserTaskDetails(){
      try{
         const res = await getAllTask();
         const user = getUser();
         
         this.setState({tasks:res.data})
         const filteredres = this.state.tasks.filter(task => task._id===user.user.taskid)
         this.setState({tasks:filteredres})
         console.log("Tasks")
         console.log(this.state.tasks)
      }
      catch(e){}
   }

   render(){
      return(
         <Table responsive className="text-center">
            <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Project</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.tasks.map((task,index)=>{
                return <UserTaskRow  changed={this.state.changed} status={task.status} id={task._id} name={task.name} project={task.projectid.title} priority={task.priority}/>
              })
            }
            </tbody>
         </Table>
      )
   }
}