import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Input, Row, Col } from "reactstrap";
import Form from 'react-bootstrap/Form'
import { createMessage } from '../../../apis/message';
import { getUser } from '../../../apis/storage';
import { updateTaskStatus } from '../../../apis/task';

export default class TaskModal extends Component
{
   state = {
      message:null,
   }

   handleChange = event => {
      event.preventDefault()
      this.setState({message:event.target.value});
   }

   completeHandler = event =>{
      event.preventDefault()
      this.completeTasks();
   }

   async completeTasks(){
      try{
         let formdata = [];
         formdata.push(encodeURIComponent('status')+'='+encodeURIComponent("completed"))
         formdata = formdata.toString();
         const task = await updateTaskStatus(this.props.id,)
         this.props.changed();
         this.props.onHide();
      }
      catch(e){}
   }

   createMessageHandler=event =>{
      event.preventDefault();
      this.addMessagetoTask();
   }

   async addMessagetoTask(){
      try{
         let formdata = [];
         let user = getUser();
         
         formdata.push(encodeURIComponent("content")+'='+encodeURIComponent(this.state.message))
         formdata.push(encodeURIComponent("userid")+'='+encodeURIComponent(user.user._id))
         formdata.push(encodeURIComponent("taskid")+'='+encodeURIComponent(this.props.id))
         formdata = formdata.join("&")
         console.log(formdata);
         const msg = await createMessage(formdata);
         alert("Message Added to the Task")
         this.props.changed();
         this.props.onHide();
      }
      catch(e){}
   }

   render(){
      console.log(this.props.message)
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
                  {/* <Form> */}
                    <Form.Row>
                      <Col>
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control placeholder="First name" value={this.props.name} disabled/>
                      </Col>
                      <Col>
                      <Form.Label>User Name</Form.Label>
                        <Form.Control placeholder="Last name" value={this.props.user} disabled/>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                      <Form.Label>Project</Form.Label>
                        <Form.Control placeholder="First name" value={this.props.project} disabled/>
                      </Col>
                      <Col>
                      <Form.Label>Priority</Form.Label>
                        <Form.Control type="number" value={this.props.priority} disabled/>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label>Message</Form.Label>
                      {
                         this.props.message.map((msg,index)=>{
                            return <Form.Control placeholder="First name" value={msg.content} disabled/>
                         })
                      }
                        
                    </Form.Row>
                    <br />
                    <Form.Group>
                     <Button type="submit" onClick={this.completeHandler}>Mark it as Complete</Button>
                    </Form.Group>
                    <hr/>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Message</Form.Label>
                          <Form.Control as="textarea" rows="3" id="message" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button type="submit" onClick={this.createMessageHandler}>Add Message</Button>
                    </Form>
                  {/* </Form> */}
               </Modal.Body>
             </Modal>
      )
   }
}