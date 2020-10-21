import React, { useState,useEffect } from 'react'
import Row from 'dashkit-ui/es/grid/row';

import "./styles/userrating.css";

import {AlbumContext,ArtistContext} from "../reducers/GlobalState";
import { useContext } from 'react';

function UserRating(){
     
    const [albumState,_] =useContext(AlbumContext);
    const [artistState,__]=useContext(ArtistContext);

    const [albums,setAlbums]=useState([]);

    const findArtist=(artists,id)=>{
        const artist=artists.find(artist=>artist.id===id);
        if(!artist) return null;
        return artist.name;
    }

    useEffect(() => {
      const albums=albumState.albums.map(album=>{
          const artist=findArtist(artistState.artists,album.artist);
          const reviews=albumState.reviews.filter(review=>review.album_id===album.id);
          const ratings=reviews.reduce((ratings,review)=>{
             ratings[review.rating]= ++ratings[review.rating] || 1;
             return ratings;
         },{});
          return {
              name:album.name,
              artist,
              total_ratings:reviews.length,
              ratings
          }
      }) 
      
      setAlbums(albums);   
    
    }, [albumState, artistState.artists])
    
  
    return (
        <div className="m-2 p-4 bg-white h-75" >
            <div className="section-title">
                <p className="font-weight-bold">User Ratings</p>
                <div>
                    {
                    albums.map(album=>(
                        <Row className="card my-2 shadow">
                            <div className="d-flex">
                                <img src="https://picsum.photos/seed/picsum/200/300" alt="album"/>
                                <div className="meta p-4 w-100">
                                    <div className="font-weight-bold">{album.name}</div>
                                    <div className="text-muted">{album.artist}</div>
                                    <div className="font-small">{album.total_ratings} reviews</div>
                                    <Rating total_rating={album.total_ratings} ratings={album.ratings}/>
                                </div>
                            </div>
                        </Row>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

function Rating({ratings,total_rating}){

  return (
      <div className="rating-container">
        <RatingBar index={1} rating={ratings["1"]} totalRating={total_rating}/>
        <RatingBar index={2} rating={ratings["2"]} totalRating={total_rating}/>
        <RatingBar index={3} rating={ratings["3"]} totalRating={total_rating}/>
        <RatingBar index={4} rating={ratings["4"]} totalRating={total_rating}/>
        <RatingBar index={5} rating={ratings["5"]} totalRating={total_rating}/>
      </div>
  )
}


function RatingBar({color,rating,totalRating,index}){
    
    let fill=Math.floor(rating/totalRating*100);
    console.log(fill);
   return (
     <div className="rating-bar d-flex">
         <div className="rating-label">{index} star</div>
         <div className="rating-indicator">
             <div className="rating-indicator-fill" style={{width:`${fill}%`}}></div>
         </div>
         <div className="rating-count ml-auto">{rating}</div>
     </div>
   )
}

export default UserRating
