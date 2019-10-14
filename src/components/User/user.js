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
   state = {
      users : []
   }

   componentDidMount(){
      this.getAllUserDetails();
   }

   async getAllUserDetails(){
      try{
         const res = await getAllUser()
         this.setState({users:res.data})
         console.log(this.state.users);
      }
      catch(e){}
   }
   render(){
      return(
         <div>
            <br/>
            <Card sm="6">
              <CardHeader>
                 List of Teams
              </CardHeader>
              <CardBody>
              &nbsp;
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
         </div>
      );
   }
}

export default User;