import React from "react";
import {PlaylistListItem} from "../playlistListItem/playlistListItem";
import './PlaylistList.css';

export class PlaylistList extends React.Component {

    render(){
        return (
            <div className="PlaylistList">
            <h2>Local Playlists</h2>

            {this.props.playLIstList.map( (playLIst, i) => { return <PlaylistListItem playLIst={playLIst} key={i} /> }
                )}

            </div>
        )
    }
}