import React,{ Component } from "react";
import { Table } from 'reactstrap';
import { getUser } from '../../apis/storage';
import { getAllTask, getTaskById } from "../../apis/task";
import UserTaskRow from "../Row/usertaskrow";
export default class UserTask extends Component{
   constructor(props){
      super(props);
      this.state = {
         tasks:[],
         complete:[],
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
         console.log(user.user.taskid)
         user.user.taskid.map(async (id,index)=>{
            const temp = await getTaskById(id);
           //console.log(temp.data)
           this.state.tasks.push(temp.data);
           this.setState({complete:this.state.tasks})
           //console.log(this.state.tasks)
         })
         console.log(this.state.complete)
         //console.log(filterres);
         //const filteredres = this.state.tasks.filter(task => task._id===user.user.taskid)
         // this.setState({tasks:filteredres})
         // console.log("Tasks")
         // console.log(this.state.tasks)
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
              <th>Message</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.tasks.map((task,index)=>{
                 console.log("Task ==>",task)
                return <UserTaskRow  messageid={task.messageid} changed={this.state.changed} status={task.status} id={task._id} name={task.name} project={task.projectid}  priority={task.priority}/>
              })
            }
            </tbody>
         </Table>
      )
   }
}