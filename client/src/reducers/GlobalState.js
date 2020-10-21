import React, {useReducer } from 'react';

import userReducer ,{initialState as usersState} from "./users";
import albumReducer,{initialState as albumsState} from "./albums";
import artistReducer,{initialState as artistState} from "./artists";
import { createContext } from 'react';

const UserContext = createContext();
const AlbumContext = createContext();
const ArtistContext = createContext();


const GlobalState=(props)=>{
    const userContextValue = useReducer(userReducer, usersState);
    const albumContextValue=useReducer(albumReducer,albumsState);
    const artistContextValue=useReducer(artistReducer,artistState);
    return(
      <UserContext.Provider value={userContextValue}>
        <AlbumContext.Provider value={albumContextValue}>
            <ArtistContext.Provider value={artistContextValue}>
                {props.children}
            </ArtistContext.Provider>
        </AlbumContext.Provider>
      </UserContext.Provider>
    )
}

export {UserContext,AlbumContext,ArtistContext};

export default GlobalState;
