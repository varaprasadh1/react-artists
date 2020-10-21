import React, { Component,useContext,useState } from 'react'

import {Button,Card,Input,Icon,Modal} from 'dashkit-ui'

import {Dropdown} from "react-bootstrap";
import CustomToggle from './Utils/CustomToggle';

import {AlbumContext} from "../reducers/GlobalState";

export function Albums () {

      const [state, dispatch] = useContext(AlbumContext);

      const [name, setName] = useState("");
      const [artist,setArtist]=useState("");


   function onDelete(id){
      dispatch({type:"DELETE",payload:{id:id}});
   }

  function addAlbum(){
    
    dispatch({type:"ADD",payload:{name,artist}})
   }

   function onEdit(id,name,artist){
       dispatch({type:"EDIT",payload:{id,name,artist}})
   }

      return (
         <div className="page users m-2 p-4 bg-white h-75" >
            <div className="section-title">
                <p className="font-weight-bold">Albums</p>
            </div>
            <Card 
                className="mx-auto my-1 p-4"
                style={{maxWidth:"300px"}}
             >
               <div className="form-group">
                  <label>Artist ID</label>
                   <Input type="text"
                    className="w-100"
                    placeholder="artist id" 
                    value={artist}
                    onChange={value=>setArtist(value)}/>
               </div>
                <Input type="text" 
                    className="mt-2 w-100"
                    placeholder="album name" 
                    value={name}
                    onChange={value=>setName(value)}
                />
                <Button 
                    className="mt-4"
                    type="success"
                    onClick={addAlbum}>ADD ARTIST</Button>
            </Card>
           <div className="users-wrapper">
              <table className="table table-sm table-nowrap card-table">  
                 <thead>
                    <tr>
                     <th>Album id</th>
                     <th>Album Name</th>
                     <th colSpan="2">Artist id</th>
                    </tr>
                 </thead>
               <tbody>
                  {
                   state.albums.map((album,i)=>(
                      <Album 
                        key={i} 
                        data={album}
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


class Album extends Component {
   constructor(props){
      super(props);
      this.state={
         edit:false,
         albumName: props.data.name,
         albumId:props.data.id,
         artistId:props.data.artist
      }
   }
  
   save(){
     const {artistId,albumName}=this.state;
     if(artistId.trim()==="" || albumName.trim()==="") return;
     this.props.onEdit(this.state.albumId,this.state.albumName.trim(),this.state.artistId.trim());
     this.setState({edit:false})
   }
   delete(){
     this.props.onDelete(this.props.data.id);
   }

   render(){
       const {data}=this.props;
       return (
            <tr>
               <td>{data.id}</td>
               <td>{data.name}</td>
               <td>{data.artist}</td>
                 <Modal
                     visible={this.state.edit}
                     title="Edit Album"
                     onClose={()=>this.setState({edit:false})}
                     onCancel={()=>this.setState({edit:false})}
                     onConfirm={this.save.bind(this)}
                  > 
                     <div className="form-group">
                        <label>Artist ID</label>
                        <Input type="text"
                           className="w-100"
                           placeholder="artist id" 
                           value={this.state.artistId}
                           onChange={value=>this.setState({artistId:value})}
                        />
                     </div>
                     <div className="form-group">
                        <label>Album Name</label>
                        <Input type="text" 
                           className="mt-2 w-100"
                           placeholder="album name" 
                           value={this.state.albumName}
                           onChange={value=>this.setState({albumName:value})}
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



export default Albums;



