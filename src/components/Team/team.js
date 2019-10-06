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
import { getAllTeams } from '../../apis/team';
class Team extends Component{

   constructor(props) {
      super(props);
      this.state = {
        activeTab: new Array(2).fill('1'),
        file:null,
        teams:[],
        changed:false
      };

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
      this.getAllTeamDetails()
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
                          <Form.Control type="text" placeholder="Name of the Team" />
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Project</Form.Label>
                          <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                          </Form.Control>
                        </Form.Group>
                     </Form.Row>
                           <Form.Text className="text-muted">
                                    Users Listed below are not in any of the teams.
                           </Form.Text><br/> 
                        <Form.Group as={Row} controlId="formGridState">
                          <Col md="2"> <Form.Check inline label="name-01" type="checkbox" id="01"/> </Col>
                          <Col md="2"> <Form.Check inline label="name-02" type="checkbox" id="02"/> </Col>
                          <Col md="2"> <Form.Check inline label="name-03" type="checkbox" id="03"/> </Col>
                          <Col md="2"> <Form.Check inline label="name-04" type="checkbox" id="04"/> </Col>
                          <Col md="2"> <Form.Check inline label="name-05" type="checkbox" id="05"/> </Col>
                          <Col md="2"> <Form.Check inline label="name-06" type="checkbox" id="06"/> </Col>
                          <Col md="2"> <Form.Check inline label="name-07" type="checkbox" id="07"/> </Col>
                          <Col md="2"> <Form.Check inline label="name-08" type="checkbox" id="08"/> </Col>
                        </Form.Group>
                        
                        <FormGroup row>
                          <Col sm="4"></Col>
                            <Col sm="4" className="column">
                              <Button type="submit" size="lg" color="success" ><i className="fa fa-dot-circle-o"></i> Create </Button>&nbsp;&nbsp;
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