import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Input } from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import { getAllTeams } from '../../../apis/team';
import { updateProject } from '../../../apis/project';
import { getAllUser } from '../../../apis/user';

export default class ProjectModal extends Component{

   state = {
      teams:[],
      users:[],
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
         const filterres = res.data.filter(data => (data.name!==this.props.team))
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

   updateHandler = event => {
      event.preventDefault();
      this.updateProjectDetails();
   }

   async updateProjectDetails()
   {
      try{
         let formdata = [];
         if(!this.state.teamid)
         {
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
         else
         {
            formdata.push(encodeURIComponent("teamid")+'='+encodeURIComponent(this.state.teamid))
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
      let unteam;
      if(this.props.team == "Unassigned")
      {
         unteam = (<Input type="select" id="teamid" >
          <option value="1">{this.props.team}</option>
         {
           this.state.teams.map((project,index)=>{
             return (<option key={index} value={project._id}> { project.name } </option>)
           })
         } 
         </Input>)
      }
      else
      {
         unteam = (<Input type="text" id="teamid" value={this.props.team} disabled></Input>)
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
           {/* <strong>Assigned Project:</strong>
           {
              this.props.projects.map((project,index)=>{
                 return <><br/><label>{index+1}.{project.title}<br/></label></>
              })
           } */}
           <Form>
              <Form.Group as={Row}>
                 <Form.Label column sm="3">
                    Title
                 </Form.Label>
                 <Form.Control type="text" disabled value= {this.props.title}/>
              </Form.Group>
              <Form.Group>
                 <Form.Label column sm="3">
                    Workspace
                 </Form.Label>
                 <Form.Control type="text" disabled value={this.props.workspace}/>
              </Form.Group>
              <Form.Group as={Row} controlId="formPlaintextPassword">
                <Form.Label column sm="3">
                  Assigned To
                </Form.Label>
                <Col sm="9">
                    <Form.Group controlId="exampleForm.ControlSelect1">
                    {unteam}
                    </Form.Group>
                </Col>
              </Form.Group>
              <Form.Group>
                 <Form.Label column sm="3">
                    Start Date
                 </Form.Label>
                 <Form.Control type="date" disabled value= {this.props.startdate}/>
              </Form.Group>
              <Form.Group>
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