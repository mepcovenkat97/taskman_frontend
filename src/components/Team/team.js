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
import TeamRow from "../Row/team";
import { getAllTeams, addTeam } from '../../apis/team';
import { getALlProject } from '../../apis/project';
import { getAllUser } from '../../apis/user';
class Team extends Component{

   constructor(props) {
      super(props);
      this.state = {
        activeTab: new Array(2).fill('1'),
        file:null,
        teams:[],
        projects:[],
        users:[],
        selected:null,
        name:null,
        team:null,
        changed:false
      };

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      this.getAllTeamDetails()
      this.getAllProjectDetails()
      this.getAllUserDetails()
    }

    async getAllUserDetails(){
      try{
        const res = await getAllUser()
        const filterres = res.data.filter(data => !data.teamid)
        this.setState({users:filterres})
      }
      catch(e){}
    }

    async getAllProjectDetails(){
      try{
        const res = await getALlProject()
        console.log(res.data)
        const filterres = res.data.filter(data => !data.teamid)
        this.setState({projects:filterres})
        console.log(this.state.projects)
      }
      catch(e){}
    }

    async getAllTeamDetails(){
      try{
        const res = await getAllTeams()
        this.setState({teams:res.data})
        console.log(this.state.teams)
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

    handleChange = event => {
      event.preventDefault();
       this.setState({[event.target.id]:event.target.value})
       console.log(this.state.name, this.state.team)
     }

     createHandler = event => {
       this.createTeam();
     }

     async createTeam(){
       try{
         let formdata = [];
         formdata.push(encodeURIComponent('name')+'='+encodeURIComponent(this.state.name))
         formdata.push(encodeURIComponent('projectid')+'='+encodeURIComponent(this.state.team))
         formdata = formdata.join("&")
         const response = await addTeam(formdata);
         alert("Team Created")
       }
       catch(e){}
     }

   tabPane() {
      return (
        <>
          <TabPane tabId="1">
             <div className="container-fluid">
               <Card className="bg-grey">
                 <CardHeader className="text-center">
                   <strong>New Team&nbsp;</strong>
                   <small>creation Form</small>
                 </CardHeader>
                 <CardBody>
                     <Form.Row>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Team Name</Form.Label>
                          <Form.Control id="name" type="text" placeholder="Name of the Team" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Project</Form.Label>
                          {/* <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                          </Form.Control> */}
                          <Input type="select" id="team" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.projects.map((project,index)=>{
                                return (<option key={index} value={project._id}> { project.title } </option>)
                              })
                            }
                            </Input>
                        </Form.Group>
                     </Form.Row>
                           <Form.Text className="text-muted">
                                    Users Listed below are not in any of the teams.
                           </Form.Text><br/> 
                        <Form.Group as={Row} controlId="formGridState">
                          {
                            this.state.users.map((user,index)=>{
                              return (<Col md="2"> <Form.Check inline label={user.name} type="checkbox" id={index}/> </Col>)
                            })
                          }
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
                 List of Teams
              </CardHeader>
              <CardBody>
              &nbsp;
                <Table responsive className="text-center">
                  <thead className="thead-light">
                  <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Project Assigned</th>
                    <th>Members Count</th>
                    <th>Options</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.teams.map((team,index)=>{
                      return <TeamRow name={team.name} project={team.projectid} user={team.userid}/>
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
                    Create New Team
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '2'}
                    onClick={() => { this.toggle(0, '2'); }}
                  >
                    Manage Team
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

export default Team;