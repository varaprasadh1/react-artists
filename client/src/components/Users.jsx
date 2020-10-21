import React, { Component,useState,useContext } from 'react'

import {Button,Card,Input,Icon,Modal} from 'dashkit-ui'

import "./styles/users.css";
import { Dropdown,} from 'react-bootstrap';
import CustomToggle from './Utils/CustomToggle';

import {UserContext} from "../reducers/GlobalState"



export function Users(){
     const [state,dispatch]=useContext(UserContext);
     const [name,setName]=useState("");
     
     function onDelete(id){
         dispatch({type:"DELETE",payload:{id:id}});
     }
     function onEdit(id,newName){
        dispatch({type:"EDIT",payload:{id,newName}})
     }
     function addUser(){
        dispatch({type:"ADD",payload:{name}})
     }

      return (
         <div className="page users m-2 p-4 bg-white h-75" >
            <div className="section-title">
               <p className="font-weight-bold">Users</p>
            </div>
            <Card 
               className="mx-auto my-1 p-4"
               style={{maxWidth:"300px"}}
            >
               <Input type="text" 
                  className = "mt-2 w-100"
                  placeholder="user name" 
                  value={name}
                  onChange={value=>setName(value)}
                  />
               <Button 
                className="mt-4"
                type="success" onClick={addUser} >ADD USER</Button>
            </Card>
           <div className="users-wrapper">
              <table className="table table-sm table-nowrap card-table"> 
                 <thead>
                    <tr>
                       <th>
                        <span className="text-muted">Id</span>
                      </th>
                       <th colSpan="2">
                        <span className="text-muted">Name</span>
                      </th>

                    </tr>
                 </thead>
               <tbody>
                  {
                   state.users.map((user,i)=>(
                      <User 
                        key={i} 
                        data={user}
                        onDelete={onDelete} 
                        onEdit={onEdit}
                        />))
                  }
               </tbody>
              </table>
           </div>
         </div>
         )
}


class User extends Component{
   constructor(props){
      super(props);
      this.state={
         edit:false,
         id:props.data.id,
         name:props.data.name,
      }
   }
   saveUser(){
      this.props.onEdit(this.state.id, this.state.name);
      this.setState({edit:false});
   }
   delete(){
      this.props.onDelete(this.props.data.id);
   }

   render(){
       const {data}=this.props;
       return (
            <tr>
               <td>{data.id}</td>
               <td>
                  <div>{data.name}</div>
               </td>
                 <Modal
                     visible={this.state.edit}
                     title="Edit User"
                     onClose={()=>this.setState({edit:false})}
                     onCancel={()=>this.setState({edit:false})}
                     onConfirm={this.saveUser.bind(this)}
                  >
                   <div className="form-group">
                        <label>User Name</label>
                        <Input type="text" 
                           className = "mt-2 w-100"
                           placeholder="user name" 
                           value={this.state.name}
                           onChange={value=>this.setState({name:value})}
                        />
                   </div>
                  </Modal>
               <td className="text-right">
                 <Dropdown drop="left">
                   <Dropdown.Toggle as={CustomToggle}>
                        <Icon type="more-vertical"/>
                   </Dropdown.Toggle>
                   <Dropdown.Menu>
                     <Dropdown.Item eventKey="1" onClick={()=>this.setState({edit:true})}>Edit</Dropdown.Item>
                     <Dropdown.Item eventKey="2" onClick={this.delete.bind(this)}>Delete</Dropdown.Item>
                   </Dropdown.Menu>
                </Dropdown>
               </td>
            </tr>
         )
   }
}







export default Users;



