import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { getALlProject } from '../../apis/project';
import { getUser } from '../../apis/storage';
import UserProjectRow from '../Row/userprojectrow';

export default class UserProject extends Component{
   constructor(props){
      super(props);
      this.state = {
         projects:[]
      }
   }

   componentDidMount(){
      this.getUserProjectDetails()
   }

   async getUserProjectDetails(){
      try{
         const res = await getALlProject()
         
         const user = getUser();
         console.log(user.user._id);
         this.setState({projects:res.data})
         const filteredres = this.state.projects.filter(project => project._id===user.user.projectid)
         console.log(filteredres)
         this.setState({projects:filteredres})
         console.log(this.state.projects)
      }
      catch(e){}
   }

   render(){
      return(
         <Table responsive className="text-center">
            <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Options</th>
            </tr>
            </thead>
            <tbody>
            {
              this.state.projects.map((project,index)=>{
                return <UserProjectRow title={project.title} startdate={project.startdate.slice(0,10)} enddate={project.enddate}/>
              })
            }
            </tbody>
         </Table>
      )
   }
}