import React,{ Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button, Input } from "reactstrap";
import Dropdown from 'react-bootstrap/Dropdown'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Form from 'react-bootstrap/Form'
import { getALlProject } from '../../../apis/project';
import { updateWorkspace } from '../../../apis/workspace';

export default class WorkspaceModal extends Component{

   state = {
      projects:[],
      selected:1,
   }

   componentDidMount(){
      this.getAllProjectDetails()
   }

   async getAllProjectDetails(){
      try{
        const res = await getALlProject()
        console.log(res.data)
        const filterres = res.data.filter(data => !data.workspaceid)
        this.setState({projects:filterres})
        console.log( this.state.projects)  
      }
      catch(e){}
    }

    handleChange = event => {
      event.preventDefault();
      console.log(event.target.value)
       this.setState({selected:event.target.value})
       console.log("Selected"+this.state.selected)
     }

     updateHandler = event => {
        event.preventDefault();
        this.updateWorkspaceDetails()
     }

     async updateWorkspaceDetails()
     {
        try{
           let formdata = [];
           formdata.push(encodeURIComponent('projectid')+'='+encodeURIComponent(this.state.selected))
           formdata = formdata.toString();
           const res = await updateWorkspace(this.props.id,formdata);
           alert("Data Added Successfully");
           this.props.changed()
           this.props.onHide()
        }
        catch(e){}
     }

   render(){
      console.log(this.props.projects)
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
                   {this.props.name}
                 </Modal.Title>
               </Modal.Header>
               <Modal.Body>
               <strong>Assigned Project:</strong>
               {
                  this.props.projects.map((project,index)=>{
                     return <><br/><label>{index+1}.{project.title}<br/></label></>
                  })
               }

               <Form>
                  <Form.Group as={Row} controlId="formPlaintextPassword">
                    <Form.Label column sm="2">
                      Projects
                    </Form.Label>
                    <Col sm="10">
                        <Form.Group controlId="exampleForm.ControlSelect1">
                        <Input type="select" id="project" onChange={this.handleChange}>
                              <option value="1">--Choose--</option>
                            {
                              this.state.projects.map((project,index)=>{
                                return (<option key={index} value={project._id}> { project.title } </option>)
                              })
                            }
                            </Input>
                        </Form.Group>
                    </Col>
                  </Form.Group>
                  <Button type="submit" onClick={this.updateHandler}>Add Project</Button>
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