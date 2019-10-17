import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Input } from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import TabContainer from 'react-bootstrap/TabContainer'
import Nav from 'react-bootstrap/Nav'
import { getAllTeams } from '../../../apis/team';
import { updateProject } from '../../../apis/project';
import { getAllUser } from '../../../apis/user';

export default class ProjectModal extends Component{

   state = {
      teams:[],
      users:[],
      selected:null,
      whomselect:null,
      enddate:this.props.enddate,
      teamid:this.props.teamid
   }

   componentDidMount(){
      this.getTeamDetails()
      this.getAllUserDetails()
   }

   async getAllUserDetails(){
      try{
         const res = await getAllUser();
         const filterres = res.data.filter(data => ( data.type!= "admin"))
         this.setState({users:filterres});
      }
      catch(e){}
   }

   async getTeamDetails(){
      try{
         const res = await getAllTeams()
         console.log(this.props.name)
         const filterres = res.data.filter(data => (data.name!==this.props.team))
         this.setState({teams:filterres})
      }
      catch(e){}
   }

   handleChange = event => {
      event.preventDefault();
      console.log(event.target.value)
       this.setState({[event.target.id]:event.target.value})
       //console.log(this.state.name, this.state.team)
     }

   handleTeamChange = event =>{
      event.preventDefault();
      console.log(event.target.value);
      this.setState({selected:event.target.value,whomselect:"team"});
   }

   handleUserChange = event =>{
      event.preventDefault();
      console.log(event.target.value);
      this.setState({selected:event.target.value,whomselect:"user"});
   }

   updateHandler = event => {
      event.preventDefault();
      this.updateProjectDetails();
   }

   async updateProjectDetails()
   {
      try{
         let formdata = [];
         if(this.state.whomselect == null)
         {
            //formdata.push(encodeURIComponent("teamid")+'='+encodeURIComponent(this.state.teamid))
            formdata.push(encodeURIComponent("enddate")+'='+encodeURIComponent(this.state.enddate))
            formdata = formdata.toString();
            const res = await updateProject(this.props.id,formdata)
            if(res.status === 200)
            {
               alert("Data Modified Successfully");
               this.props.changed()
               this.props.onHide()
            }
         }
         else if(this.state.whomselect == "user")
         {
            formdata.push(encodeURIComponent("userid")+'='+encodeURIComponent(this.state.selected))
            formdata.push(encodeURIComponent("enddate")+'='+encodeURIComponent(this.state.enddate))
            formdata = formdata.join("&");
            const res = await updateProject(this.props.id,formdata)
            if(res.status === 200)
            {
               alert("Data Modified Successfully");
               this.props.changed()
               this.props.onHide()
            }
         }
         else if(this.state.whomselect == "team")
         {
            formdata.push(encodeURIComponent("teamid")+'='+encodeURIComponent(this.state.selected))
            formdata.push(encodeURIComponent("enddate")+'='+encodeURIComponent(this.state.enddate))
            formdata = formdata.join("&");
            const res = await updateProject(this.props.id,formdata)
            if(res.status === 200)
            {
               alert("Data Modified Successfully");
               this.props.changed()
               this.props.onHide()
            }
         }
      }
      catch(e){}
   }

   render(){
      let teamselection = (
         <Input type="select" id="teamid" onChange={this.handleTeamChange}>
            <option>--Choose--</option>
          {
            this.props.teams.map((team,index)=>{
              return (<option key={index} value={team._id}> { team.name } </option>)
            })
          }
          </Input>
      );
      let userselection = (
         <Input type="select" id="userid" onChange={this.handleUserChange}>
            <option>--Choose--</option>
          {
            this.state.users.map((team,index)=>{
              return (<option key={index} value={team._id}> { team.name } </option>)
            })
          }
          </Input>
      );
      let selectteam;
      if(this.props.team == "Unassigned")
      {
      selectteam = (
         <Tab.Container defaultActiveKey="first">
                <Row>
                  <Col sm="3" md="3">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="first">Team</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="second">User</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm="8" md="8">
                    <Tab.Content>
                      <Tab.Pane eventKey="first">
                        {teamselection}
                      </Tab.Pane>
                      <Tab.Pane eventKey="second">
                        {userselection}
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
      );
      }
      else
      {
         selectteam = (<Input type="text" id="teamid" value={this.props.team} disabled></Input>)
      }
      
      return(
         <>
         <Modal   
           {...this.props}
           size="md"
           aria-labelledby="contained-modal-title-vcenter"
           centered
         >
           <Modal.Header closeButton>
             <Modal.Title id="contained-modal-title-vcenter">
               Update Project Details
             </Modal.Title>
           </Modal.Header>
           <Modal.Body>
           <Form>
              <Form.Group as={Row}>
                 <Form.Label column sm="3">
                    Title
                 </Form.Label>
                 <Form.Control type="text" disabled value= {this.props.title}/>
              </Form.Group>
              <Form.Group as={Row}>
                 <Form.Label column sm="3">
                    Workspace
                 </Form.Label>
                 <Form.Control type="text" disabled value={this.props.workspace}/>
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label>
                  Assigned To
                </Form.Label>
                </Form.Group>
                <Form.Group>
                  {selectteam}
                  </Form.Group>
              <Form.Group as={Row}>
                 <Form.Label column sm="3">
                    Start Date
                 </Form.Label>
                 <Form.Control type="date" disabled value= {this.props.startdate}/>
              </Form.Group>
              <Form.Group as={Row}>
                 <Form.Label column sm="3">
                    End Date
                 </Form.Label>
                 <Form.Control type="date" id="enddate" value= {this.state.enddate} onChange={this.handleChange}/>
              </Form.Group>
              <Button type="submit" onClick={this.updateHandler}>Update Project Details</Button>
           </Form>
           </Modal.Body>
           <Modal.Footer>
             <Button onClick={this.props.onHide}>Close</Button>
           </Modal.Footer>
         </Modal>
         </>
      )
   }
}