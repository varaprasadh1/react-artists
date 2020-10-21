
const initialState={
    artists:[{
        id:"1",
        name:"john doe"
    }]
}


const reducer=(state=initialState,{type,payload})=>{
  switch(type){
      case 'ADD':
            const {name}=payload;
            if(name==="") return;
            let artist={
                id :'#'+Date.now(),
                name
            }
        return {...state,artists:[...state.artists,artist]}
      case 'EDIT':
            const {id,newName}=payload;
            const _artist=state.artists.find(artist=>artist.id===id);
            if (!_artist) return;
            _artist.name = newName;
            return {...state,artists:[...state.artists]}                
      case 'DELETE':
           const artists = state.artists.filter(artist => artist.id !== payload.id);
          return {...state,artists};
     default: return state;
}
}

export {initialState};

export default reducer;

