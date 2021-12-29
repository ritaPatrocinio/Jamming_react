import React from "react";
import './playlistListItem.css'

export class playlistListItem extends React.Component {
    render(){
        return (
            <div className="playlistListItem">
                
                {this.props.playlists.map(playlist => { return playlist.name }
                )}
                
            </div>
        )
    }
}