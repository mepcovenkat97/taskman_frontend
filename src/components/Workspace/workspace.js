import React, { Component } from 'react';
import {Col, Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import {
   Button,
   Card,
   CardBody,
   CardFooter,
   CardHeader,
   FormGroup,
   Table,
   Input,
   Label,
   Row,
 } from 'reactstrap';
 import Form from 'react-bootstrap/Form'
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
       let user = getUser()
       this.createWorkspace();
       
    }

    async createWorkspace() {
       try{
          const workspace = {
            name:this.state.name
          }
          console.log(workspace);
          const response = await addWorkspace(workspace);
          alert("Workspace Created")
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
                 <CardHeader className="text-center">
                   <strong>New Workspace&nbsp;</strong>
                   <small>creation Form</small>
                 </CardHeader>
                 <CardBody>
                 
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
                     <Form.Row>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Project</Form.Label>
                          <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                          </Form.Control>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Team</Form.Label>
                          <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                          </Form.Control>
                        </Form.Group>
                     </Form.Row>

                     <FormGroup row>
                          <Col sm="4"></Col>
                            <Col sm="4" className="column">
                              <Button type="submit" size="lg" color="success" onClick={this.createHandler}><i className="fa fa-dot-circle-o"></i> Create </Button>&nbsp;&nbsp;
                              <Button type="reset" size="lg" color="danger"><i className="fa fa-ban"></i> Cancel</Button>
                            </Col>
                     </FormGroup>
                  
                 </CardBody>
               </Card>
               
               </div>
            {/* <CreateCommunityPost changeTab={this.changeTabHandler}/> */}
          </TabPane>

          <TabPane tabId="2">            
          <Col xs="12" lg="12">
            <Card sm="6">
              <CardHeader>
                 List of Posts posted in Community Page
              </CardHeader>
              <CardBody>
              &nbsp;
                <Table responsive className="text-center">
                  <thead className="thead-light">
                  <tr>
                    <th>Name</th>
                    <th>Project Assigned</th>
                    <th>Team Assigned</th>
                    <th>Options</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.workspaces.map((workspace,index)=>{
                      return <WorkspaceRow name={workspace.name} projectassigned={workspace.projectid} teamassigned={workspace.teamid}/>
                    })
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
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