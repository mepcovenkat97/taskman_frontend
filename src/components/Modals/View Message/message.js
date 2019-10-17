import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Input, Row, Col } from "reactstrap";
import Form from 'react-bootstrap/Form'
import { createMessage, getMessageById } from '../../../apis/message';
import { getUser } from '../../../apis/storage';

export default class MessageModal extends Component {
   state = {
      message: [],
      getmsg: [],
      content: null
   }
   componentDidMount() {
      this.getMessageDetails();
   }

   handleChange = event => {
      event.preventDefault()
      this.setState({content:event.target.value});
   }


   async getMessageDetails() {
      try {
         this.props.message.map(async (msg, index) => {
            const msg1 = await getMessageById(msg._id);
            this.state.getmsg.push(msg1.data);
            this.setState({ message: this.state.getmsg });
         })
      }
      catch (e) { }
   }

   createMessageHandler = event => {
      event.preventDefault();
      this.addMessagetoTask();
   }

   async addMessagetoTask() {
      try {
         let formdata = [];
         let user = getUser();

         formdata.push(encodeURIComponent("content") + '=' + encodeURIComponent(this.state.content))
         formdata.push(encodeURIComponent("userid") + '=' + encodeURIComponent(user.user._id))
         formdata.push(encodeURIComponent("taskid") + '=' + encodeURIComponent(this.props.id))
         formdata = formdata.join("&")
         console.log(formdata);
         const msg = await createMessage(formdata);
         alert("Message Added to the Task")
         this.props.changed();
         this.props.onHide();
      }
      catch (e) { }
   }

   render() {
      return (
         <Modal
            {...this.props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
         >
            <Modal.Header closeButton onClick={this.props.onMsgHide}>
               <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <Form.Row>
                  <Form.Label>Message</Form.Label>
                  {
                     this.state.message.map((msg, index) => {
                        return <Form.Control placeholder="First name" value={msg.userid.name + ": " + msg.content} disabled />
                     })
                  }
               </Form.Row>
               <hr />
               <Form>
                  <Form.Group controlId="exampleForm.ControlTextarea1">
                     <Form.Label>Message</Form.Label>
                     <Form.Control as="textarea" rows="3" id="message" onChange={this.handleChange} />
                  </Form.Group>
                  <Button type="submit" onClick={this.createMessageHandler}>Add Message</Button>
               </Form>
            </Modal.Body>
            <Modal.Footer>
             <Button onClick={this.props.onMsgHide}>Close</Button>
           </Modal.Footer>
         </Modal>
      )
   }
}