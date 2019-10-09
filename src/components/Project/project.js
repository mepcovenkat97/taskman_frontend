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
import { getALlProject, addProject } from '../../apis/project';
import ProjectRow from "../Row/project";
import { getAllWorkspace } from "../../apis/workspace";
import { WorkspaceDropDown } from '../Dropdown/workspacedropdown';
import { getAllTeams } from '../../apis/team';
class Project extends Component{

   constructor(props) {
      super(props);
      this.state = {
        activeTab: new Array(2).fill('1'),
        title:null,
        startdate:null,
        enddate:null,
        workspaceid:null,
        projects:[],
        teams:[],
        changed:false,
        unassigned:[],
        selected:null,
      };

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      this.getAllProjectDetails()
      this.getWorkspaceDetails();
      this.getTeamDetails()
    }

    async getTeamDetails(){
      try{
        const res = await getAllTeams();
        this.setState({teams:res.data})
      }
      catch(e){}
    }

    async getWorkspaceDetails(){
      try{
         const res = await getAllWorkspace()
         console.log(res.data)
         this.setState({unassigned:res.data});
         console.log(this.state.unassigned)
      }
      catch(e){}
   }

    async getAllProjectDetails(){
      try{
        const res = await getALlProject();
        this.setState({projects:res.data})
        console.log(this.state.projects)
      }
      catch(e){}
    }

    toggle(tabPane, tab) {
      const newArray = this.state.activeTab.slice()
      newArray[tabPane] = tab
      this.setState({
        activeTab: newArray,
      });
    }

    createHandler = event => {
      {
        this.state.projects.map((project,index)=>{
          if(project.title === this.state.title)
          {
            alert("Project with such name Already Existing")
          }
        })
      }
      this.createProjects();
    }

    async createProjects(){
      try{
        let formdata = [];
          formdata.push(encodeURIComponent('title')+'='+encodeURIComponent(this.state.title))
          formdata.push(encodeURIComponent('workspaceid')+'='+encodeURIComponent(this.state.workspaceid))
          formdata.push(encodeURIComponent('teamid')+'='+encodeURIComponent(this.state.teamid))
          formdata.push(encodeURIComponent('startdate')+'='+encodeURIComponent(this.state.startdate))
          formdata.push(encodeURIComponent('enddate')+'='+encodeURIComponent(this.state.enddate))
          formdata = formdata.join("&")
          console.log(formdata)
          const response = await addProject(formdata);
          alert("Project Created")
      }
      catch(e){}
    }

    handleTextChange = event => {
      event.preventDefault();
      this.setState({ [event.target.id]: event.target.value });
   }

   handleChange = event => {
     event.preventDefault();
     console.log(event.target.value)
     this.setState({[event.target.id]:event.target.value})
     //console.log(this.state.selected)
   }

   tabPane() {
    //  console.log("Testing ")
    //  console.log(this.state.projects[8])
      return (
        <>
          <TabPane tabId="1">
             <div className="container-fluid">
               <Card className="bg-grey">
                 <CardHeader className="text-center">
                   <strong>New Project&nbsp;</strong>
                   <small>creation Form</small>
                 </CardHeader>
                 <CardBody>
                     <Form.Row>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Project Name</Form.Label>
                          <Form.Control type="text" id="title" placeholder="Name of the Project" onChange={this.handleTextChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Workspace</Form.Label>
                          {/* <Form.Control as="select"> */}
                            {/* <option>Choose...</option> */}
                            <Input type="select" id="workspaceid" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.unassigned.map((workspace,index)=>{
                                return (<option key={index} value={workspace._id}> { workspace.name } </option>)
                              })
                            }
                            </Input>
                             {/* <WorkspaceDropDown /> */}
                          {/* </Form.Control> */}
                         
                        </Form.Group>
                     </Form.Row>         
                        <Form.Group as={Row} controlId="formGridState">
                          <Form.Label column sm="2">Start Date</Form.Label>
                          <Col sm="4"><Form.Control id="startdate" type="Date" onChange={this.handleTextChange}/></Col>
                          <Form.Label column sm="2">Due Date</Form.Label>
                          <Col sm="4"><Form.Control id="enddate" type="Date" onChange={this.handleTextChange}/></Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formGridState">
                          <Form.Label column sm="2">Team</Form.Label>
                          <Col sm="4">
                          <Input type="select" id="teamid" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.teams.map((team,index)=>{
                                return (<option key={index} value={team._id}> { team.name } </option>)
                              })
                            }
                            </Input>
                          </Col>
                          <Col sm="4">
                              <Form.Text className="text-muted">
                                 Team can assign it later also.
                              </Form.Text>
                          </Col>
                        </Form.Group>
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
                 List of Projects
              </CardHeader>
              <CardBody>
              &nbsp;
                <Table responsive className="text-center">
                  <thead className="thead-light">
                  <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Workspace Assigned</th>
                    <th>Team Assigned</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Options</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.projects.map((project,index)=>{
                      return <ProjectRow id={project._id} title={project.title} startdate={project.startdate.slice(0,10)} enddate={project.enddate.slice(0,10)} workspace={project.workspaceid.name} team={project.teamid.name} teamid={project.teamid._id}/>
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
                    Create New Project
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '2'}
                    onClick={() => { this.toggle(0, '2'); }}
                  >
                    Manage Project
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

export default Project;