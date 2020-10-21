import React, { useState,useContext} from 'react'

import {Grid} from "dashkit-ui";
import "./styles/albumrating.css";

import {AlbumContext,ArtistContext,UserContext} from "../reducers/GlobalState";
import { useEffect } from 'react';

const {Row,Col}=Grid;


function AlbumRating(){
        const [albumState, dispatchToAlbum] = useContext(AlbumContext);
        const [artistState,dispatchToArtist]=useContext(ArtistContext);
        const [userState,dispatchToUser]=useContext(UserContext);

        const [currentUser,setCurrentUser]=useState(null);
        
        const [albums,setAlbums]=useState([]);
        

        const findArtist=(artists,id)=>{
            const artist=artists.find(artist=>artist.id===id);
            if(!artist) return null;
            return artist.name;
        }
        
        const findRating=(reviews,album_id,user_id)=>{
           const review=reviews.find(review=>review.user_id===user_id && review.album_id===album_id);
           if(!review) return 0;
           return review.rating;
        }

        const changeRating=(album_id,rating)=>{
            const payload={
                 user_id:currentUser,
                 album_id,
                 rating
             }
             dispatchToAlbum({type:"ADD_REVIEW",payload})
        }  
        
        useEffect(()=>{
          setCurrentUser(userState.users[0] && userState.users[0].id)
        },[]);

        useEffect(()=>{
           const albums=albumState.albums.map(album=>{

            return {
                    ...album,
                    artist:findArtist(artistState.artists,album.artist),
                    rating:findRating(albumState.reviews,album.id,currentUser)
                }
           });
           setAlbums(albums);

        },[albumState.albums, albumState.reviews, artistState.artists,currentUser]);
      
        return (
            <div className="m-2 p-4 bg-white h-75" >
                <div className="mb-4">
                    <select prefix="user" className="user-select" onChange={e=>setCurrentUser(e.target.value)}>
                        {userState.users.map(user => (
                            <option key={user.id} value={user.id} >{user.name}</option>
                            ))}
                    </select>
                </div>
                <div className="section-title">
                    <p className="font-weight-bold">Albums Rating</p>
                </div>
                <Row>
                  {albums.map((album,i)=>(
                      <Album 
                        key={i} 
                        data={album}
                        onRatingChange={changeRating}
                      />))}
                </Row>
            </div>
         )
    }


function Album({data,onRatingChange}){

    return (
        <Col  className="flex-1 m-2">
            <div className="card shadow">
                <img src="https://picsum.photos/seed/picsum/200/300" alt=""/>
                <div className="meta p-2">
                    <div className="card-content font-weight-bold">{data.name}</div>
                    <div className="card-content ">{data.artist}</div>
                    <div>
                        <Rating rating={data.rating} onChange={(rating)=>onRatingChange(data.id,rating)}/>
                    </div>
                </div>
            </div>
        </Col>
    )
}

function Rating({rating,onChange}){
    const [hover,setHover]=useState(null);
    return(
        <div className="star-rating-wrapper">
            {[...Array(5)].map((_,i)=>(
            <span className="star-wrapper"
               key={i}
            >
               <svg 
                onMouseEnter={()=>setHover(i+1)}
                onMouseLeave={()=>setHover(null)}
                onClick={()=>onChange(i+1)}
                className={`star ${(i<(hover || rating))?'active':''}`}  viewBox="0 -10 511.991 511" xmlns="http://www.w3.org/2000/svg"><path d="M510.652 185.883a27.177 27.177 0 00-23.402-18.688l-147.797-13.418-58.41-136.75C276.73 6.98 266.918.497 255.996.497s-20.738 6.483-25.023 16.53l-58.41 136.75-147.82 13.418c-10.837 1-20.013 8.34-23.403 18.688a27.25 27.25 0 007.937 28.926L121 312.773 88.059 457.86c-2.41 10.668 1.73 21.7 10.582 28.098a27.087 27.087 0 0015.957 5.184 27.14 27.14 0 0013.953-3.86l127.445-76.203 127.422 76.203a27.197 27.197 0 0029.934-1.324c8.851-6.398 12.992-17.43 10.582-28.098l-32.942-145.086 111.723-97.964a27.246 27.246 0 007.937-28.926zM258.45 409.605"/></svg>
            </span>
            ))}
        </div>
    )
}

export default AlbumRating
