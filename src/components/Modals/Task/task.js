import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Input, Row, Col } from "reactstrap";
import Form from 'react-bootstrap/Form'
import { createMessage } from '../../../apis/message';
import { getUser } from '../../../apis/storage';
import { updateTaskStatus } from '../../../apis/task';
import MessageModal from '../View Message/message';

export default class TaskModal extends Component
{
   state = {
      message:null,
      priority:this.props.priority,
      showMsgModal:false,
   }

   handleChange = event => {
      event.preventDefault()
      this.setState({priority:event.target.value});
   }

   toggleMsgModel = () => {  
      const show = !this.state.showMsgModal;
      //this.props.onHide();
      this.setState({showMsgModal:show});
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
         const task = await updateTaskStatus(this.props.id,formdata)
         this.props.changed();
         this.props.onHide();
      }
      catch(e){}
   }

   updateHandler = event => {
      event.preventDefault();
      this.updateTasks();
   }

   async updateTasks(){
      try{
         let formdata = [];
         formdata.push(encodeURIComponent('priority')+'='+encodeURIComponent(this.state.priority));
         formdata = formdata.toString();
         const task = await updateTaskStatus(this.props.id,formdata)
         this.props.changed();
         this.props.onHide();
      }
      catch(e){}
   }

   // createMessageHandler=event =>{
   //    event.preventDefault();
   //    this.addMessagetoTask();
   // }

   // async addMessagetoTask(){
   //    try{
   //       let formdata = [];
   //       let user = getUser();
         
   //       formdata.push(encodeURIComponent("content")+'='+encodeURIComponent(this.state.message))
   //       formdata.push(encodeURIComponent("userid")+'='+encodeURIComponent(user.user._id))
   //       formdata.push(encodeURIComponent("taskid")+'='+encodeURIComponent(this.props.id))
   //       formdata = formdata.join("&")
   //       console.log(formdata);
   //       const msg = await createMessage(formdata);
   //       alert("Message Added to the Task")
   //       this.props.changed();
   //       this.props.onHide();
   //    }
   //    catch(e){}
   // }

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
                        <Form.Label><b><u>Task Name</u></b></Form.Label>
                        <Form.Control plaintext readOnly placeholder="First name" value={this.props.name} disabled/>
                      </Col>
                      <Col>
                      <Form.Label><b><u>User Name</u></b></Form.Label>
                        <Form.Control plaintext readOnly placeholder="Last name" value={this.props.user} disabled/>
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                      <Form.Label><b><u>Project</u></b></Form.Label>
                        <Form.Control plaintext readOnly placeholder="First name" value={this.props.project} disabled/>
                      </Col>
                      <Col>
                      <Form.Label><b><u>Priority</u></b></Form.Label>
                        <Form.Control type="number" max="10" min="1" value={this.state.priority} onChange={this.handleChange}/>
                      </Col>
                    </Form.Row>
                    {/* <Form.Row>
                      <Form.Label>Message</Form.Label>
                      {
                         this.props.message.map((msg,index)=>{
                            return <Form.Control value={msg.content} disabled/>
                         })
                      }
                        
                    </Form.Row> */}
                    <br />
                    <Form.Row>
                       <Col></Col>
                       <Col><Button size="xs" block type="submit" onClick={this.updateHandler}>Update Task</Button></Col>
                       <Col></Col>
                    </Form.Row>
                    <hr/>
                    <Form.Row>
                        <Button size="xs" block type="submit" onClick={this.completeHandler}>Mark it as Complete</Button>
                        <Button size="xs" block onClick={() => this.toggleMsgModel()}><b>View Messages</b></Button>

                        <MessageModal
                              id={this.props.id}
                              message = {this.props.message}
                              show = {this.state.showMsgModal}
                              onMsgHide = {this.toggleMsgModel}
                           />
                    </Form.Row>
                    {/* <Form>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Message</Form.Label>
                          <Form.Control as="textarea" rows="3" id="message" onChange={this.handleChange}/>
                        </Form.Group>
                        <Button type="submit" onClick={this.createMessageHandler}>Add Message</Button>
                    </Form> */}
                  {/* </Form> */}
               </Modal.Body>
             </Modal>
      )
   }
}