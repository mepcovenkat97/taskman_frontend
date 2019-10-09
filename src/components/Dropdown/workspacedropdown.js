import React, { Component } from 'react';
import { getUser } from "../../apis/storage";
import { getAllWorkspace } from '../../apis/workspace';
import Form from 'react-bootstrap/Form'
export class WorkspaceDropDown extends Component{

   state = {
      unassigned:null
   }
   componentDidMount(){
      this.getWorkspaceDetails();
   }

   async getWorkspaceDetails(){
      try{
         const res = await getAllWorkspace()
         console.log(res.data)
         const filterres = res.data.filter(data => !data.projectid)
         console.log(filterres)
         this.setState({unassigned:filterres});
         console.log(this.state.unassigned)
      }
      catch(e){}
   }
   render(){
      let res = (
               this.state.unassigned.map( (workspace,index) => {
                 return ( <option key={workspace._id} value={workspace.name}>{workspace.name}</option>)
               })
      )
      return (
         {res}
      )
   }
}