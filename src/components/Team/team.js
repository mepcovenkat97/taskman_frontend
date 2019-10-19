import React, { Component } from 'react';
import Select from "react-select";
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

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

class Team extends Component{

   constructor(props) {
      super(props);
      this.state = {
        activeTab: new Array(2).fill('1'),
        file:null,
        teams:[],
        projects:[],
        users:[],
        user:[],
        options:[],
        selected:null,
        userid:null,
        name:null,
        team:null,
        changed:false
      };

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    

    toggleChanged = () =>{
      const change = !this.state.changed;
      this.setState({changed:change})
      this.getAllTeamDetails()
      this.getAllProjectDetails()
      this.getAllUserDetails()
   }

    componentDidMount(){
      this.getAllTeamDetails()
      this.getAllProjectDetails()
      this.getAllUserDetails()
    }

    async getAllUserDetails(){
      try{
        const res = await getAllUser()
        const filterres = res.data.filter(data => (!data.teamid && data.type != "admin"))
        const optionsdata =[];
        filterres.map((res,index)=>{
          optionsdata.push({"value":res._id,"label":res.name})
        })
        console.log(optionsdata);
        this.setState({options:optionsdata});
        this.setState({users:filterres})
       // this.setState({options:{"value":}})
        //console.log(this.state.users);
      }
      catch(e){}
    }

    async getAllProjectDetails(){
      try{
        const res = await getALlProject()
        //console.log(res.data)
        const filterres = res.data.filter(data => (!data.teamid && !data.userid))
        
        this.setState({projects:filterres})
        
       // console.log(this.state.projects)
      }
      catch(e){}
    }

    async getAllTeamDetails(){
      try{
        const res = await getAllTeams()
        this.setState({teams:res.data})
        //console.log(this.state.teams)
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
      console.log(event.target.id);
       this.setState({[event.target.id]:event.target.value})
       //console.log(this.state.name, this.state.team)
     }

     updateHandler = event => {
       if(event == null )
       {
        this.state.user.splice(0,this.state.user.length);
       }
      else if( event.length >= 1)
      {
      if(this.state.user.includes(event[event.length-1].value))
      {
        console.log("Hai")
        const data = event;
        this.state.user.splice(0,this.state.user.length)
        data.map((d,i)=>{
          this.state.user.push(d.value);
        })
      }
      else
      {
        this.state.user.push(event[event.length-1].value);
      }
      }
      console.log(this.state.user);
     }

     createHandler = event => {
      this.state.teams.map((project,index)=>{
        if(project.name === this.state.name)
        {
          alert("Team with such name Already Existing")
        }
      })
       this.createTeam();
     }
    //  handleChangeChk = (event,i) => {
    //        let prj = this.state.users;
    //        prj[i].checked = !prj[i].checked;
    //        this.setState({users: prj});
    //  }
     async createTeam(){
       try{
         console.log(this.state.user);
         let formdata = [];
         formdata.push(encodeURIComponent('name')+'='+encodeURIComponent(this.state.name))
         formdata.push(encodeURIComponent('userid')+'='+encodeURIComponent(this.state.user))
         formdata.push(encodeURIComponent('projectid')+'='+encodeURIComponent(this.state.team))
         formdata = formdata.join("&")
         const response = await addTeam(formdata);
         if(response.status === 200)
         {
            alert("Team Created")
            this.toggleChanged();
         }
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
                        <Form.Group controlId="formGridState">
                          <Form.Label>Team Name</Form.Label>
                          <Form.Control id="name" type="text" placeholder="Name of the Team" onChange={this.handleChange}/>
                        </Form.Group>
                     <Form.Row>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Users</Form.Label>
                          <Form.Text className="text-muted">
                                    You can select Multiple Users
                           </Form.Text>
                           {/* <Input type="select" multiple id="userid" data-live-search="true" onClick={this.updateHandler}>
                              <option>--Choose--</option>
                  
                            {
                              this.state.users.map((project,index)=>{
                                console.log(project._id);
                                return (<option key={index} value={project._id}>{ project.name }</option>)
                              })
                            }
                            </Input>  */}
                            <Select
                              isMulti = {true}
                              options={this.state.options}
                              onChange={this.updateHandler}
                            />

                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Project</Form.Label>
                          <Form.Text className="text-muted">
                                    Project without Team will be Listed
                           </Form.Text>
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
            <Row>
              {
                this.state.teams.map((team,index)=>{
                  return <TeamRow name={team.name} id={team._id} project={team.projectid} user={team.userid} changed ={this.toggleChanged}/>
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