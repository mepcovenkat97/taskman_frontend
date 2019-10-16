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
import { getAllUser } from '../../apis/user';
class User extends Component{

   constructor(props)
   {
      super(props);
      this.toggle = this.toggle.bind(this);
   }
   state = {
      activeTab: new Array(2).fill('1'),
      users : []
   }

   componentDidMount(){
      this.getAllUserDetails();
   }

   toggle(tabPane, tab) {
      const newArray = this.state.activeTab.slice()
      newArray[tabPane] = tab
      this.setState({
        activeTab: newArray,
      });
    }

   async getAllUserDetails(){
      try{
         const res = await getAllUser()
         this.setState({users:res.data})
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
                          <Form.Control type="text" id="Name" placeholder="Name of the User" onChange={this.handleTextChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Email-ID</Form.Label>
                          <Form.Control type="email" id="Name" placeholder="Email of the User" onChange={this.handleTextChange}/>
                        </Form.Group>
                     </Form.Row>
                     <Form.Row>        
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Password</Form.Label>
                          <Form.Control id="password" type="password" onChange={this.handleTextChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Role</Form.Label>
                          <Form.Control as="select">
                             <option>User</option>
                             <option>Admin</option>
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
                        console.log("User ==> ",user)
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