// import React, { useReducer } from 'react';


const initialState={
    users:[
    {
        id:"1",
        name:"billy"
    },
    {
        id:"2",
        name:"nick"
    }
]
}


const reducer=(state=initialState,{type,payload})=>{
  switch(type){
      case 'ADD':
            const {name}=payload;
            if(name==="") return;
            const user={
                id :'#'+Date.now(),
                name
            }
        return {...state,users:[...state.users,user]}
      case 'EDIT':
            const {id,newName}=payload;
            const userToEdit=state.users.find(user=>user.id===id);
            if(!userToEdit) return;
            userToEdit.name=newName;
            return {...state,users:[...state.users]}                
      case 'DELETE':
          const users = state.users.filter(user => user.id !== payload.id);
          return {...state,users};
     default: return state;
  }
}
export {initialState};

export default reducer;

