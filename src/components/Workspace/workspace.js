import React, { Component } from 'react';
import {Col, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import {
   Button,
  //  Card,
  //  CardBody,
  //  CardFooter,
  //  CardHeader,
   FormGroup,
   Table,
   Input,
   Label,
   Row,
 } from 'reactstrap';
 import Alert from 'react-bootstrap/Alert'
import Form from 'react-bootstrap/Form'
import Card from 'react-bootstrap/Card'
import WorkspaceRow from "../Row/workspace";
import { getUser } from '../../apis/storage';
import { addWorkspace }  from '../../apis/workspace';
import { getAllWorkspace } from '../../apis/workspace';
import SimpleReactValidator from "simple-react-validator";

class Workspace extends Component{

   constructor(props) {
      super(props);
      this.state = {
        activeTab: new Array(2).fill('1'),
        file:null,
        name:null,
        workspaces:[],
        changed:false
      };
      this.validator = new SimpleReactValidator({
         element:message=><div className="text-danger">{message}</div>,
         autoForceUpdate:this
       });

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    toggleChanged = () =>{
      const change = !this.state.changed;
      this.setState({changed:change})
      this.getWorkspaceDetails()
   }

    componentDidMount = () =>{
      this.getWorkspaceDetails();
    }

    async getWorkspaceDetails(){
      try{
        const res = await getAllWorkspace();
        this.setState({workspaces:res.data});
        console.log(this.state.workspaces);
      }
      catch(e)
      {}
    }

    toggle(tabPane, tab) {
      const newArray = this.state.activeTab.slice()
      newArray[tabPane] = tab
      this.setState({
        activeTab: newArray,
      });
    }

    createHandler = event =>{
      {
        this.state.workspaces.map((work,index)=>{
          if(work.name === this.state.name)
          {
            alert("Workspace Already Existing")
          }
        })
      }
       this.createWorkspace();
       
    }
    async createWorkspace() {
       try
       {
         
          let formdata = [];
          formdata.push(encodeURIComponent('name')+'='+encodeURIComponent(this.state.name))
          formdata = formdata.toString()
          const response = await addWorkspace(formdata);
          if(response.status === 200)
          {
            alert("Workspace Created")
            this.toggleChanged()
          }
       }
       catch(e){

       }
    }

    handleTextChange = event => {
      event.preventDefault();
      this.setState({ [event.target.id]: event.target.value });
   }

   tabPane() {
      return (
        <>
          <TabPane tabId="1">
             
             <div className="container-fluid">
               <Card className="bg-grey">
                 <Card.Header className="text-center">
                   <strong>New Workspace&nbsp;</strong>
                   <small>creation Form</small>
                 </Card.Header>
                 <Card.Body>
                 
                 <br/>
                     <Form.Group as={Row} controlId="formPlaintextPassword">
                       <Form.Label column sm="2">
                         Workspace Name
                       </Form.Label>
                       <Col sm="8">
                         <Form.Control type="text" id="name" placeholder="Name of the workspace" onChange={this.handleTextChange}/>
                         {this.validator.message(
                           "Post Title",
                           this.state.name,
                           "required|min:1"
                        )}
                       </Col>
                     </Form.Group>
                     <FormGroup row>
                          <Col sm="4"></Col>
                            <Col sm="4" className="column">
                              <Button type="submit" size="xs" color="success" onClick={this.createHandler}><i className="fa fa-dot-circle-o"></i> Create </Button>&nbsp;&nbsp;
                              <Button type="reset" size="xs" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                            </Col>
                     </FormGroup>
                  
                 </Card.Body>
               </Card>
               
               </div>
            {/* <CreateCommunityPost changeTab={this.changeTabHandler}/> */}
          </TabPane>

          <TabPane tabId="2">
            <Row>          
                  {
                    this.state.workspaces.map((workspace,index)=>{
                      return <WorkspaceRow id={workspace._id} name={workspace.name} projectassigned={workspace.projectid} changed ={this.toggleChanged}/>
                    })
                  }
          </Row>
          </TabPane>
        </>
      );
    }

   render(){
      return(
         <div>
         <br />
         <Col xs="12" md="12" className="mb-12">
         <Nav tabs>
           <NavItem>
             <NavLink
               active={this.state.activeTab[0] === '1'}
               onClick={() => { this.toggle(0, '1'); }}
             >
               Create New Workspace
             </NavLink>
           </NavItem>
           <NavItem>
             <NavLink
               active={this.state.activeTab[0] === '2'}
               onClick={() => { this.toggle(0, '2'); }}
             >
               Manage Workspace
             </NavLink>
           </NavItem>
         </Nav>
         <TabContent activeTab={this.state.activeTab[0]}>
           {this.tabPane()}
         </TabContent>
       </Col>
       <br />
      </div>
      );
   }
}

export default Workspace;