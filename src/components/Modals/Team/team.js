import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Input, Row, Col } from "reactstrap";
import { getAllUser } from '../../../apis/user';
import Form from 'react-bootstrap/Form'
import { updateTeam } from '../../../apis/team';

export default class TeamModal extends Component
{
   state = {
      users:[],
      user:[]
   }

   componentDidMount(){
      this.getAllUserDetails();
   }

   async getAllUserDetails(){
      try{
         const res = await getAllUser();
         const filterres = res.data.filter(data => (!data.teamid))
         this.setState({users:filterres});
      }
      catch(e){}
   }

   updateHandler = event => {
      event.preventDefault();
      console.log(event.target.id);
     this.state.user.push(event.target.value);
     console.log(this.state.user);
    }
   
   updateDataHandler = event =>{
      event.preventDefault();
      
      this.updateTeamDetails()
   }

   async updateTeamDetails()
   {
      try{
         console.log(this.props.id)
         let formdata = [];
         formdata.push(encodeURIComponent('userid')+'='+encodeURIComponent(this.state.user))
         formdata = formdata.toString();
         const team = await updateTeam(this.props.id,formdata);
         
         alert("Team Updated Successfully");
         this.props.changed();
         this.props.onHide();
      }
      catch(e){}
   }

   render(){
      return(
         <Modal
               {...this.props}
               size="md"
               aria-labelledby="contained-modal-title-vcenter"
               centered
             >
                <Modal.Header closeButton>
                 <Modal.Title id="contained-modal-title-vcenter">
                   {this.props.name}
                 </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                  <Form.Row>
                     <Form.Group as={Col} sm="12" md="12" controlId="formGridState">
                       <Form.Label>Users</Form.Label>
                       <Input type="select" multiple id="userid" onClick={this.updateHandler}>
                           <option>--Choose--</option>
                         {
                           this.state.users.map((project,index)=>{
                             console.log(project._id);
                             return (<option key={index} value={project._id}> { project.name } </option>)
                           })
                         }
                         </Input>
                     </Form.Group>
                  </Form.Row>
                  <Button type="submit" onClick={this.updateDataHandler}>Update Team</Button>
               </Modal.Body>
             </Modal>
      )
   }
}