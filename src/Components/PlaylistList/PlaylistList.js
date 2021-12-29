import React from "react";
import {playlistListItem} from "../playlistListItem/playlistListItem";
import './PlaylistList.css';

export class PlaylistList extends React.Component {
    constructor(props){
        super(props);
    
        this.state = {
            playlists: [] ,
            
          };
        }

    render(){
        return (
            <div className="PlaylistList">
            <h2>Local Playlists</h2>
            <playlistListItem playlists={this.state.playlists}  />
            </div>
        )
    }
}