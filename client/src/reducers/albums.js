// import React, { useReducer } from 'react';


const initialState={
    albums:[
        {
            id:"1",
            artist:"1",
            name:"ABCDEFD"
        }
    ],
    reviews:[
        {
            user_id:"1",
            album_id:"1",
            rating:5
        }
    ]
}


const reducer=(state=initialState,{type,payload})=>{
  switch(type){
    case 'ADD':{
      const {name,artist}=payload;
      if (name === "" ||  artist==="") return;
      const album={
         id:'#'+Date.now(),
         artist,
         name,
       }
        return {...state,albums:[...state.albums,album]}
    }
    case 'EDIT':{
       const {id,name,artist}=payload;
       const album = state.albums.find(album => album.id === id);
       if (!album) return;
       album.name = name;
       album.artist=artist;
        return {...state,albums:[...state.albums]}
       }
    case 'DELETE':
        const {id}=payload;
        const albums = state.albums.filter(album => album.id !==id);
        const reviews=state.reviews.filter(review=>review.album_id!==id);
        return {...state,albums,reviews};
    case 'ADD_REVIEW':
        const {user_id,album_id,rating}=payload;
        let review=state.reviews.find(review=>review.user_id===user_id && review.album_id===album_id);
        if(review){
            review.rating=rating;
        }else{
            review={user_id,album_id,rating};
            state.reviews.push(review);
        }
        return {...state,reviews:[...state.reviews]};
    default: return state;
  }
}

export {initialState};

export default reducer;

