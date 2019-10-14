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
import { getAllUser } from '../../apis/user';
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
        teamid:null,
        changed:false,
        unassigned:[],
        users:[],
        userid:null,
        selected:null,
        changed:false
      };

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    toggleChanged = () =>{
      const change = !this.state.changed;
      this.setState({changed:change})
      this.getAllProjectDetails()
      this.getWorkspaceDetails();
      this.getTeamDetails()
      this.getAllUserDetails()
   }

    componentDidMount(){
      this.getAllProjectDetails()
      this.getWorkspaceDetails();
      this.getTeamDetails()
      this.getAllUserDetails()
    }

    async getAllUserDetails()
    {
      try{
        const res = await getAllUser();
        const filterres = res.data.filter(data=>!data.projectid)
        this.setState({users:filterres});
      }
      catch(e){}
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
        if(this.state.teamid)
        {
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
        else if(this.state.userid)
        {
          console.log("Create Project")
          formdata.push(encodeURIComponent('title')+'='+encodeURIComponent(this.state.title))
          formdata.push(encodeURIComponent('workspaceid')+'='+encodeURIComponent(this.state.workspaceid))
          formdata.push(encodeURIComponent('userid')+'='+encodeURIComponent(this.state.userid))
          formdata.push(encodeURIComponent('startdate')+'='+encodeURIComponent(this.state.startdate))
          formdata.push(encodeURIComponent('enddate')+'='+encodeURIComponent(this.state.enddate))
          formdata = formdata.join("&")
          console.log(formdata)
          const response = await addProject(formdata);
          alert("Project Created")
        }
        else if(!this.state.teamid && !this.state.userid)
        {
          formdata.push(encodeURIComponent('title')+'='+encodeURIComponent(this.state.title))
          formdata.push(encodeURIComponent('workspaceid')+'='+encodeURIComponent(this.state.workspaceid))
          formdata.push(encodeURIComponent('startdate')+'='+encodeURIComponent(this.state.startdate))
          formdata.push(encodeURIComponent('enddate')+'='+encodeURIComponent(this.state.enddate))
          formdata = formdata.join("&")
          console.log(formdata)
          const response = await addProject(formdata);
          if(response.status === 200)
          {
            alert("Project Created")
            this.toggleChanged()
          }
        }
          
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
     console.log(event.target.id)
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
                            <Input type="select" id="workspaceid" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.unassigned.map((workspace,index)=>{
                                return (<option key={index} value={workspace._id}> { workspace.name } </option>)
                              })
                            }
                            </Input>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>        
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control id="startdate" type="Date" onChange={this.handleTextChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Due Date</Form.Label>
                          <Form.Control id="enddate" type="Date" onChange={this.handleTextChange}/>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>
                     <Form.Text className="text-muted">
                                    Choose Either a Team or a User. But Both are Optional.
                          </Form.Text>
                     </Form.Row>
                     <Form.Row>
                          
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Team</Form.Label>
                          
                          <Input type="select" id="teamid" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.teams.map((team,index)=>{
                                return (<option key={index} value={team._id}> { team.name } </option>)
                              })
                            }
                            </Input>
                          </Form.Group>
                          <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>User</Form.Label>
                          <Input type="select" id="userid" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.users.map((team,index)=>{
                                return (<option key={index} value={team._id}> { team.name } </option>)
                              })
                            }
                            </Input>
                        </Form.Group>
                      </Form.Row>
                        <FormGroup row>
                          <Col sm="4"></Col>
                            <Col sm="4" className="column">
                              <Button type="submit" size="xs" color="success" onClick={this.createHandler}><i className="fa fa-dot-circle-o"></i> Create </Button>&nbsp;&nbsp;
                              <Button type="reset" size="xs" color="danger"><i className="fa fa-ban"></i> Cancel</Button>

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
                    <th>Assigned To</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Options</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.projects.map((project,index)=>{
                      if((project.teamid==null || typeof project.teamid=="undefined") && !project.userid)
                      {
                        return <ProjectRow
                        status={project.status}
                        changed ={this.toggleChanged} 
                        id={project._id} 
                        title={project.title} 
                        startdate={project.startdate.slice(0,10)} 
                        enddate={project.enddate.slice(0,10)} 
                        workspace={project.workspaceid.name} 
                        team="Unassigned" 
                        teamid=""/>
                      }
                      else if(project.userid)
                      {

                        return <ProjectRow 
                        status={project.status}
                        changed ={this.toggleChanged}
                        id={project._id} 
                        title={project.title} 
                        startdate={project.startdate.slice(0,10)} 
                        enddate={project.enddate.slice(0,10)} 
                        workspace={project.workspaceid.name} 
                        team={"User - "+project.userid.name} 
                        teamid=""/>
                      }
                      else{
                      return <ProjectRow 
                              status={project.status}
                              id={project._id} 
                              changed ={this.toggleChanged}
                              title={project.title} 
                              startdate={project.startdate.slice(0,10)} 
                              enddate={project.enddate.slice(0,10)} 
                              workspace={project.workspaceid.name} 
                              team={"Team - "+project.teamid.name } 
                              teamid={project.teamid._id}/>
                            }
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