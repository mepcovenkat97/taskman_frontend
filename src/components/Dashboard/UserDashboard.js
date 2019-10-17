import React, { Component, Suspense } from "react";
import {
   BrowserRouter as Router,
   Route,
   Link
 } from 'react-router-dom'
import { Container } from "reactstrap";
import Tab from 'react-bootstrap/Tab'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import UserNav from "./UserNav"
import UserProject from "../Project/userproject";
import UserTask from "../Task/usertask";
import { getUser } from "../../apis/storage";
import {getTeam} from "../../apis/team"


import { Table } from 'reactstrap';
import { getAllTask, getTaskById } from "../../apis/task";
import UserTaskRow from "../Row/usertaskrow";

export default class UserDashboard extends Component{

  componentDidMount(){
    this.getAllDetails();
  //  this.getUserTaskDetails()
  }
  state = {
    teamname:"",
    tasks:[],
    complete:[],
    changed:null,
  }

  toggleChanged = () =>{
    const change = !this.state.changed;
    this.setState({changed:change})
    this.getAllDetails();
   // this.getUserTaskDetails()
 }

  async getAllDetails(){
    try{
      const user = getUser();
      const team = await getTeam(user.user.teamid);
      console.log("Team")
      
      this.setState({teamname:team.data.name})
      console.log(this.state.teamname)

    }
    catch(e){}
  }

//   async getUserTaskDetails(){
//     try{
//        const res = await getAllTask();
//        const user = getUser();
//        console.log(user.user.taskid)
//        user.user.taskid.map(async (id,index)=>{
//           const temp = await getTaskById(id);
//          this.state.tasks.push(temp.data);
//          this.setState({complete:this.state.tasks})
//        })
//        console.log(this.state.complete)
      
//     }
//     catch(e){}
//  }


   render(){
      return(
         <div>
         <UserNav />
         <br />
         <br />
         <br />
         <Container>
         <Tab.Container defaultActiveKey="first">
           <Row>
             <Col sm={2}>
               <Nav variant="pills" className="flex-column">
                 <Nav.Item>
                   <Nav.Link eventKey="first">Team</Nav.Link>
                 </Nav.Item>
                 <Nav.Item>
                   <Nav.Link eventKey="second">Task</Nav.Link>
                 </Nav.Item>
               </Nav>
             </Col>
             <Col sm={10}>
               <Tab.Content>
                 <Tab.Pane eventKey="first">
                    <label><strong>Team Name</strong>:&nbsp;{this.state.teamname}</label>
                 </Tab.Pane>
                 <Tab.Pane eventKey="second">
                    <UserTask
                      toggleChanged = {this.toggleChanged}
                   /> 

                    {/* <Table responsive className="text-center">
                       <thead className="thead-light">
                       <tr>
                         <th>Status</th>
                         <th>Name</th>
                         <th>Project</th>
                         <th>Priority</th>
                         <th>Start Date</th>
                         <th>End Date</th>
                         <th>Message</th>
                         <th>Mark it as complete</th>
                       </tr>
                       </thead>
                       <tbody>
                       {
                         this.state.tasks.map((task,index)=>{
                            console.log("Task ==>",task)
                           return <UserTaskRow  messageid={task.messageid} changed={this.state.changed} status={task.status} id={task._id} name={task.name} project={task.projectid}  priority={task.priority} startdate={task.startdate} enddate={task.enddate} toggleChanged={this.toggleChanged}/>
                         })
                       }
                       </tbody>
                    </Table> */}
                 </Tab.Pane>
               </Tab.Content>
             </Col>
           </Row>
         </Tab.Container>
         </Container>
         </div>
      )
   }
}