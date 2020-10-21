import React, { Component, useContext,useState} from 'react'

import {Button,Card,Input,Icon,Modal} from 'dashkit-ui'
import {Dropdown} from "react-bootstrap"

import CustomToggle from './Utils/CustomToggle';

import {ArtistContext} from "../reducers/GlobalState"


export function Artists(){
    const [state,dispatch]=useContext(ArtistContext);
   
    const [name,setName]=useState("");

   function onDelete(id){
       dispatch({type:"DELETE",payload:{id:id}});
   }
   function addArtist(){
      dispatch({type:"ADD",payload:{name}})
   }
   function onEdit(id,newName){
         dispatch({type:"EDIT",payload:{id,newName}})
   }

      return (
         <div className="page users m-2 p-4 bg-white h-75" >
         <div className="section-title">
             <p className="font-weight-bold">Artists</p>
         </div>
         <Card 
           className="mx-auto my-1 p-4"
           style={{maxWidth:"300px"}}
         >
            <Input type="text" 
               className="mt-2 w-100"
               placeholder="user name" 
               value={name}
               onChange={value=>setName(value)}
               />
            <Button 
               className="mt-4"
               type="success"
               onClick={addArtist}>ADD ARTIST</Button>
         </Card>
           <div className="users-wrapper">
              <table className="table table-sm table-nowrap card-table">   
                 <thead>
                    <tr>
                     <th>id</th>
                     <th>name</th>
                     <th></th>
                     <th></th>
                    </tr>
                 </thead>
               <tbody>
                  {
                   state.artists.map((user,i)=>(
                      <Artist 
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


class Artist extends Component {
   constructor(props){
      super(props);
      this.state={
         edit:false,
         name:this.props.data.name,
         id:this.props.data.id
      }
   }
   
   save(){
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
                     title="Edit Artist"
                     onClose={()=>this.setState({edit:false})}
                     onCancel={()=>this.setState({edit:false})}
                     onConfirm={this.save.bind(this)}
                  >
                   <div className="form-group">
                        <label>Artist Name</label>
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



export default Artists;



