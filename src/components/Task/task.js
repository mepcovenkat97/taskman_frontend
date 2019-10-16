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
import { getALlProject, getProjectById } from '../../apis/project';
import { getAllUser, getUserById } from '../../apis/user';
import { getTeam } from '../../apis/team';
class Task extends Component{

   constructor(props) {
      super(props);
      this.state = {
        activeTab: new Array(2).fill('1'),
        flag:0,
        tasks:[],
        projects:[],
        users:[],
        changed:false,
        name:null,
        projectid:null,
        userid:null,
        onlyuser:null,
        getteamusers:[],
        priority:null,
        startdate:null,
        enddate:null,
      };

      this.toggle = this.toggle.bind(this);
      //this.handleChange = this.handleChange.bind(this);
    }

    toggleChanged = () =>{
      const change = !this.state.changed;
      this.setState({changed:change})
      this.getAllTaskDetail()
      this.getAllProjectDetails()
   }

    componentDidMount = () => {
      this.getAllTaskDetail()
      this.getAllProjectDetails()
      //this.getAllUserDetails()
    }

    async getAllUserDetails(){
      try{
        const res = await getAllUser();
        this.setState({users:res.data})

      }
      catch(e){}
    }

    async getAllProjectDetails(){
      try{
        const res = await getALlProject()
        this.setState({projects:res.data})
      }
      catch(e){}
    }

    async getAllTaskDetail(){
      try{
        const res = await getAllTask()
        this.setState({tasks:res.data});
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
      this.state.tasks.map((project,index)=>{
        if(project.name === this.state.name)
        {
          alert("Task with such name Already Existing")
        }
      })
      let flag = 0;
      if(new Date(this.state.startdate) < new Date(Date.now()))
      {
        alert("Start Date should be greater than current date");
        flag = 1;
      }
      if(new Date(this.state.enddate) < new Date(Date.now()))
      {
        alert("Due Date should be greater than current date");
        flag = 1;
      }
      if(new Date(this.state.enddate) <= new Date(this.state.startdate))
      {
        alert("Due Date should be greater than start date");
        flag = 1;
      }
      if(flag == 0){
      this.createTask();
      }
    }

    async createTask(){
      try{
        let formdata = [];
        formdata.push(encodeURIComponent("name")+'='+encodeURIComponent(this.state.name))
        formdata.push(encodeURIComponent("projectid")+'='+encodeURIComponent(this.state.projectid))
        formdata.push(encodeURIComponent('userid')+'='+encodeURIComponent(this.state.userid))
        formdata.push(encodeURIComponent('priority')+'='+encodeURIComponent(this.state.priority))
        formdata.push(encodeURIComponent('startdate')+'='+encodeURIComponent(this.state.startdate))
        formdata.push(encodeURIComponent('enddate')+'='+encodeURIComponent(this.state.enddate))
        formdata = formdata.join("&")

        const response = await addTask(formdata);
        if(response.status === 200)
        {
          alert("Task Created");
          this.toggleChanged()
        }
      }
      catch(e){}
    }

    handleProjectChange = event => {
      event.preventDefault();
      // console.log(event.target.value)
      this.setState({onlyuser:null,getteamusers:[]})
      this.setState({projectid:event.target.value})
      console.log(event.target.value)
      this.getProject(event.target.value);
    }

    async getProject(id)
    {
      try{
        const res = await getProjectById(id);
        //console.log("DAta=>",res.data)
        if(res.data.userid)
        {
          const user = await getUserById(res.data.userid._id)
          this.setState({onlyuser:user.data.name});
          this.setState({flag:1});

        }
        else if(res.data.teamid)
        {
          const team = await getTeam(res.data.teamid);
           team.data.userid.map(async (id,index)=>{
              const temp = await getUserById(id);
              this.state.getteamusers.push(temp.data);
              this.setState({flag:1})
              //console.log(this.state.getteamusers)
          })
        }
      }
      catch(e){}
    }

    handleChange = event => {
      event.preventDefault();
      console.log(event.target.value)
      this.setState({[event.target.id]:event.target.value})
      console.log(this.state.priority)
    }

   tabPane() {
    let user;
     if(this.state.flag == 1)
     {
    
     if(this.state.onlyuser)
     {
       user = (<label>{this.state.onlyuser.name}</label>)
     }
     else
     {
       user = (
        <Input type="select" id="userid" onChange={this.handleChange}>
          <option>--Choose--</option>
          {
            this.state.getteamusers.map((user,index)=>{
              console.log(user);
              return (<option key={index} value={user._id}> { user.name } </option>)
            })
          }
        </Input>
       )
     }
    }
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
                          <Input type="select" id="projectid" onChange={this.handleProjectChange}>
                              <option>--Choose--</option>
                              {
                                this.state.projects.map((project,index)=>{
                                  //console.log("Project ID==>",project._id);
                                  return (<option key={index} value={project._id}> { project.title } </option>)
                                })
                              }
                            </Input>
                        </Form.Group>
                     </Form.Row>
                        
                        {/* <Form.Group as={Row} controlId="formGridState">
                          <Form.Label>Assign To</Form.Label>
                          <Col sm="4">
                            {user}
                          </Col>
                          <Form.Label>Priority</Form.Label>
                          <Col sm="4">
                              <Input type="number" id="priority" min="1" max="10" id="priority" onChange={this.handleChange}/>
                          </Col>
                        </Form.Group>  */}

                        <Form.Row>        
                            <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                              <Form.Label>Assign To</Form.Label>
                              {/* <Form.Control id="startdate" type="Date" onChange={this.handleChange}/> */}
                              {user}
                            </Form.Group>
                            <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                              <Form.Label>Priority</Form.Label>
                              <Input type="number" id="priority" min="1" max="10" id="priority" onChange={this.handleChange}/>
                            </Form.Group>
                        </Form.Row>


                        <Form.Row>        
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Start Date</Form.Label>
                          <Form.Control id="startdate" type="Date" onChange={this.handleChange}/>
                        </Form.Group>
                        <Form.Group as={Col} sm="12" md="6" controlId="formGridState">
                          <Form.Label>Due Date</Form.Label>
                          <Form.Control id="enddate" type="Date" onChange={this.handleChange}/>
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
                 List of Teams
              </CardHeader>
              <CardBody>
              &nbsp;
                <Table responsive className="text-center">
                  <thead className="thead-light">
                  <tr>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Project </th>
                    <th>Assigned To</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Priority</th>
                    <th>Messages</th>
                    <th>Options</th>
                  </tr>
                  </thead>
                  <tbody>
                  {
                    this.state.tasks.map((task,index) =>{
                      console.log("Task ==>",task)
                      return <TaskRow name={task.name} message={task.messageid} project={task.projectid} assignedto={task.userid} status={task.status} id={task._id} priority={task.priority} changed ={this.toggleChanged} startdate={task.startdate} enddate={task.enddate}/>
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