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

export default class UserDashboard extends Component{

  componentDidMount(){
    this.getAllDetails();
  }
  state = {
    teamname:""
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
             <Col sm={9}>
               <Tab.Content>
                 <Tab.Pane eventKey="first">
                    <label><strong>Team Name</strong>:&nbsp;{this.state.teamname}</label>
                 </Tab.Pane>
                 <Tab.Pane eventKey="second">
                   <UserTask/>
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