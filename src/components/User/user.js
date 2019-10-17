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
import UserRow from "../Row/user";
import { getAllUser, createUser } from '../../apis/user';
import { getAllTeams } from '../../apis/team';
class User extends Component{

   constructor(props)
   {
      super(props);
      this.toggle = this.toggle.bind(this);
   }
   state = {
      activeTab: new Array(2).fill('1'),
      users : [],
      rowusers:[],
      name:null,
      email:null,
      password:null,
      type:null,
      teams:[],
      teamid:null,
   }

   componentDidMount(){
      this.getAllUserDetails();
      this.getAllTeamDetails()
   }

   toggle(tabPane, tab) {
      const newArray = this.state.activeTab.slice()
      newArray[tabPane] = tab
      this.setState({
        activeTab: newArray,
      });
    }

    async getAllTeamDetails(){
      try{
        const res = await getAllTeams()
        this.setState({teams:res.data})
        //console.log(this.state.teams)
      }
      catch(e){}
    }

    handleTextChange = event =>{
      event.preventDefault();
      console.log(event.target.value)
      this.setState({[event.target.id]:event.target.value})
      console.log(this.state.name,this.state.email,this.state.type,this.state.teamid);
    }

    createHandler = event => {
      event.preventDefault();
      console.log("USer")
      {
        this.state.users.map((user,index)=>{
          if(user.email == this.state.email)
          {
            alert("User with such a email is already existing")
          }
        })
      }
      this.createUserDetails();
    }

    async createUserDetails(){
      try{
        let formdata = [];
        if(this.state.teamid)
        {
        formdata.push(encodeURIComponent('name')+'='+encodeURIComponent(this.state.name));
        formdata.push(encodeURIComponent('email')+'='+encodeURIComponent(this.state.email));
        formdata.push(encodeURIComponent('password')+'='+encodeURIComponent(this.state.password));
        formdata.push(encodeURIComponent('type')+'='+encodeURIComponent(this.state.type));
        formdata.push(encodeURIComponent('teamid')+'='+encodeURIComponent(this.state.teamid));
        formdata = formdata.join("&");
        const response = await createUser(formdata);
        alert("User Created Successfull")
        }
        else{
          formdata.push(encodeURIComponent('name')+'='+encodeURIComponent(this.state.name));
        formdata.push(encodeURIComponent('email')+'='+encodeURIComponent(this.state.email));
        formdata.push(encodeURIComponent('password')+'='+encodeURIComponent(this.state.password));
        formdata.push(encodeURIComponent('type')+'='+encodeURIComponent(this.state.type));
        formdata = formdata.join("&");
        const response = await createUser(formdata);
        alert("User Created Successfull")
        }
      }
      catch(e){}
    }

   async getAllUserDetails(){
      try{
         const res = await getAllUser()
         const filres = res.data.filter(data => (data.type != "admin"))
         this.setState({users:filres})
         //this.setState({})
         console.log(this.state.users);
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
                   <strong>New User&nbsp;</strong>
                   <small>creation Form</small>
                 </CardHeader>
                 <CardBody> 
                 <Form.Row>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Name</Form.Label>
                          <Form.Control type="text" id="name" placeholder="Name of the User" onChange={this.handleTextChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Email-ID</Form.Label>
                          <Form.Control type="email" id="email" placeholder="Email of the User" onChange={this.handleTextChange}/>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>        
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Password</Form.Label>
                          <Form.Control id="password" type="password" onChange={this.handleTextChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Role</Form.Label>
                          <Input id="type" type="select" onChange={this.handleTextChange}>
                            <option value="" selected>--Choose--</option>
                             <option value="user">User</option>
                             <option value="admin">Admin</option>
                           </Input>
                        </Form.Group>
                     </Form.Row>
                        <Form.Group controlId="formGridState">
                          <Form.Label>Team</Form.Label>
                          <Input type="select" id="teamid" onClick={this.handleTextChange}>
                              <option>--Choose--</option>
                            {
                              this.state.teams.map((project,index)=>{
                                console.log(project._id);
                                return (<option key={index} value={project._id}> { project.name } </option>)
                              })
                            }
                            </Input>
                            <Form.Text className="text-muted">
                                    Team Selection is Optional
                           </Form.Text>
                        </Form.Group>
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
            <Card sm="6">
              <CardHeader>
                 List of users
              </CardHeader>
              <CardBody>
                <Table responsive className="text-center">
                  <thead className="thead-light">
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Task Count</th>
                    {/* <th>Options</th> */}
                  </tr>
                  </thead>
                  <tbody>
                  {
                     this.state.users.map((user,index)=>{
                        //console.log("User ==> ",user)
                        return <UserRow type={user.type} name={user.name} email={user.email} task={user.taskid.length}/>
                     })
                  }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
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
                Create New User
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                active={this.state.activeTab[0] === '2'}
                onClick={() => { this.toggle(0, '2'); }}
              >
                Manage User
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

export default User;