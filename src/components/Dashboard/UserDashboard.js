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

export default class UserDashboard extends Component{
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
                 <Nav.Item>
                   <Nav.Link eventKey="third">Project</Nav.Link>
                 </Nav.Item>
               </Nav>
             </Col>
             <Col sm={9}>
               <Tab.Content>
                 <Tab.Pane eventKey="first">
                    <label>123</label>
                 </Tab.Pane>
                 <Tab.Pane eventKey="second">
                   <UserTask/>
                 </Tab.Pane>
                 <Tab.Pane eventKey="third">
                    <UserProject />
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