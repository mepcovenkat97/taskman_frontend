import React, { Component } from "react";
import { Button } from "reactstrap";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import WorkspaceModal from "../Modals/Workspace/updateWorkspaceModal";

export default class WorkspaceRow extends Component{

   componentDidMount(){
      this.setState({projects:this.props.projectassigned})
   }
   state = {
      showModal:false,
      projects:[],
   }

   toggleModel = () => {  
      const show = !this.state.showModal;
      this.setState({showModal:show});
  }

  

   render(){
      let count;
      if(this.props.projectassigned.length === 0)
      {
        count =   (<label> No Yet Assigned </label>)
      }
      else
      {
       count =( this.props.projectassigned.map((project,index)=>{
            return <Card.Title>{index+1}.&nbsp;{project.title}<br/></Card.Title>
         }))
      }
      return(
         <Col>
         <Card className="text-center" border="secondary" style={{ width: '18rem' }}>
           <Card.Header>{this.props.name}</Card.Header>
           <Card.Body>
            <strong><u>Projects Assigned</u><br/></strong>
             {/* <Card.Title>Secondary Card Title</Card.Title> */}
             {count}
           </Card.Body>
           {/* <Card.Footer>
              <Button onClick={() => this.toggleModel()}>View</Button>
              <WorkspaceModal 
              id = {this.props.id}
              name = {this.props.name}
              show = {this.state.showModal}
              onHide = {this.toggleModel}
              changed = {this.props.changed}
              projects = {this.state.projects}/>
           </Card.Footer> */}
         </Card>
         </Col>
      )
   }
}