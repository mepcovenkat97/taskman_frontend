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
import { getAllTask, addTask } from '../../apis/task';
import TaskRow from "../Row/task";
import { getALlProject } from '../../apis/project';
import { getAllUser } from '../../apis/user';
class Task extends Component{

   constructor(props) {
      super(props);
      this.state = {
        activeTab: new Array(2).fill('1'),
        file:null,
        tasks:[],
        projects:[],
        users:[],
        changed:false,
        name:null,
        projectid:null,
        userid:null,
        priority:null
      };

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () => {
      this.getAllTaskDetail()
      this.getAllProjectDetails()
      this.getAllUserDetails()
    }

    async getAllUserDetails(){
      try{
        const res = await getAllUser()
        this.setState({users:res.data})

      }
      catch(e){}
    }

    async getAllProjectDetails(){
      try{
        const res = await getALlProject()
        this.setState({projects:res.data})
        console.log(this.state.projects)
      }
      catch(e){}
    }

    async getAllTaskDetail(){
      try{
        const res = await getAllTask()
        this.setState({tasks:res.data});
        console.log(this.state.tasks)
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
      this.createTask();
    }

    async createTask(){
      try{
        let formdata = [];
        formdata.push(encodeURIComponent("name")+'='+encodeURIComponent(this.state.name))
        formdata.push(encodeURIComponent("projectid")+'='+encodeURIComponent(this.state.projectid))
        formdata.push(encodeURIComponent('userid')+'='+encodeURIComponent(this.state.userid))
       // formdata.push(encodeURIComponent('priority')+'='+encodeURIComponent(this.state.priority))
        formdata = formdata.join("&")

        const response = await addTask(formdata);
        alert("Task Created");
      }
      catch(e){}
    }

    handleChange = event => {
      event.preventDefault();
      this.setState({[event.target.id]:event.target.value})
      console.log(this.state.selected)
    }

   tabPane() {
      return (
        <>
          <TabPane tabId="1">
             <div className="container-fluid">
               <Card className="bg-grey">
                 <CardHeader className="text-center">
                   <strong>New Task&nbsp;</strong>
                   <small>creation Form</small>
                 </CardHeader>
                 <CardBody>
                     <Form.Row>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Task Name</Form.Label>
                          <Form.Control type="text" id="name" placeholder="Name of the Task" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Project</Form.Label>
                          {/* <Form.Control as="select">
                            <option>Choose...</option>
                            <option>...</option>
                          </Form.Control> */}
                          <Input type="select" id="projectid" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.projects.map((project,index)=>{
                                return (<option key={index} value={project._id}> { project.title } </option>)
                              })
                            }
                            </Input>
                        </Form.Group>
                     </Form.Row>
                        
                        <Form.Group as={Row} controlId="formGridState">
                          <Form.Label column sm="2">Assign To</Form.Label>
                          <Col sm="4">
                          <Input type="select" id="userid" onChange={this.handleChange}>
                              <option>--Choose--</option>
                            {
                              this.state.users.map((user,index)=>{
                                return (<option key={index} value={user._id}> { user.name } </option>)
                              })
                            }
                            </Input>
                          </Col>
                          <Form.Label column sm="2">Priority</Form.Label>
                          <Col sm="4">
                              <Form.Check inline name="radio" label="1" type="radio" id="01"/>
                              <Form.Check inline name="radio" label="2" type="radio" id="02"/>
                              <Form.Check inline name="radio" label="3" type="radio" id="03"/>
                              <Form.Check inline name="radio" label="4" type="radio" id="04"/>
                              <Form.Check inline name="radio" label="5" type="radio" id="05"/>
                              <Form.Check inline name="radio" label="6" type="radio" id="06"/>
                              <Form.Check inline name="radio" label="7" type="radio" id="07"/>
                              <Form.Check inline name="radio" label="8" type="radio" id="08"/>
                              <Form.Check inline name="radio" label="9" type="radio" id="09"/>
                              <Form.Check inline name="radio" label="10" type="radio" id="10"/> 
                              {/* <Input type="range" min="1" max="10" class="slider" id="myRange" /> */}
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
                 List of Teams
              </CardHeader>
              <CardBody>
              &nbsp;
                <Table responsive className="text-center">
                  <thead className="thead-light">
                  <tr>
                    <th>Flag</th>
                    <th>Name</th>
                    <th>Project </th>
                    <th>Assigned To</th>
                    <th>Status</th>
                    <th>Options</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.tasks.map((task,index) => {
                      return <TaskRow name={task.name} project={task.projectid} assignedto={task.userid}/>
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
                    Create New Task
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    active={this.state.activeTab[0] === '2'}
                    onClick={() => { this.toggle(0, '2'); }}
                  >
                    Manage Task
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

export default Task;