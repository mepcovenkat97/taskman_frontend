import React,{ Component } from "react";
import Button from "react-bootstrap/Button"
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col'
import TeamModal from "../Modals/Team/team";
export default class TeamRow extends Component{

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
      if(this.props.project.length === 0)
      {
        count =   (<label> No Yet Assigned </label>)
      }
      else
      {
       count =( this.props.project.map((data,index)=>{
            return <Card.Title>{index+1}.&nbsp;{data.title}<br/></Card.Title>
         }))
      }
      return(
         <Col>
         <Card className="text-center" border="secondary" style={{ width: '18rem' }}>
           <Card.Header>{this.props.name}</Card.Header>
           <Card.Body>
            <strong><u>Projects Assigned</u><br/></strong>
             {/* <Card.Title>Secondary Card Title</Card.Title> */}
             {count}<br/>
            <strong><u>Member Count</u><br/></strong>
            {this.props.user.length}
           </Card.Body>
           <Card.Footer>
              <Button onClick={() => this.toggleModel()}>Add Team Members</Button>
              <TeamModal 
              id = {this.props.id}
              project = {this.props.project}
              user = {this.props.user}
              name = {this.props.name}
              show = {this.state.showModal}
              onHide = {this.toggleModel}
              changed = {this.props.changed}
              />
           </Card.Footer>
         </Card>
         </Col>
      )
   }
}