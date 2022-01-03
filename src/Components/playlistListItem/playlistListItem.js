import React from "react";
import './playlistListItem.css'

export class PlaylistListItem extends React.Component {
    render(){
        return (
            <div className="playlistListItem playlistListItem-information">
                
                 <h3> {this.props.playLIst} </h3> 
                
            </div>
        )
    }
}