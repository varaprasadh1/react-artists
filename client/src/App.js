import React, { useContext, useReducer } from 'react';
import './App.css';
import 'dashkit-ui/lib/style/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Albums from "./components/Albums";
import Users from "./components/Users";
import Artists from "./components/Artists";
import UserRating from "./components/UserRating";
import AlbumRating from "./components/AlbumRating";

import {Route,Switch, withRouter} from "react-router-dom";

import {Menu,Grid} from "dashkit-ui";
import GlobalState from './reducers/GlobalState';


const {Row,Col}=Grid;




function App(props){
 
  


  const onMenuSelect=(index)=>{
      props.history.push(index);
  };


    return (
       <GlobalState>
        <Row className="app">
          <Col className="nav">
                <Menu theme="dark" 
                  defaultActiveKey="users" 
                  className="nav-menu"
                  onSelect={onMenuSelect}
                >
                  <Menu.Item icon="user" index="users">Users</Menu.Item>
                  <Menu.Item icon="music" index="albums">Albums</Menu.Item>
                  <Menu.Item icon="user" index="artists">Artists</Menu.Item>
                  <Menu.Item icon="thumbs-up" index="user-rating">User Rating</Menu.Item>
                  <Menu.Item icon="star" index="album-rating">Album Rating</Menu.Item>
                </Menu>
          </Col>
          <Col xs>
                <Switch>
                  <Route path="/users" component={Users}></Route>
                  <Route path="/albums" component={Albums}></Route>
                  <Route path="/artists" component={Artists}></Route>
                  <Route path="/user-rating" component={UserRating}></Route>
                  <Route path="/album-rating" component={AlbumRating}></Route>
                  <Route path="*" component={()=><div>page not found</div>}/>
                </Switch>
          </Col>
        </Row>
      </GlobalState>
     );  
}


export default withRouter(App);
