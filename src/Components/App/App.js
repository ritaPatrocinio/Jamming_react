import React from 'react';
import './App.css';
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import {SearchBar} from '../SearchBar/SearchBar'
import Spotify from '../../util/Spotify';
import { PlaylistList } from '../PlaylistList/PlaylistList';

class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        searchResults: [] ,
        playlistName: "New Playlist",
        playlistTracks: [],
        playLIstList: [],
      };

      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
      }

      componentDidMount() {
        window.addEventListener('load', () => {Spotify.getAccessToken()});
      }
     

  search(term){
    Spotify.search(term)
    .then(searchResults => {
      if(searchResults.length > 0){
      this.setState({searchResults: searchResults });
    } 
    console.log('searchResults:', searchResults);
  })
  }

  savePlaylist(){
    let trackURIs = this.state.playlistTracks.map(track => track.uri);
    let playLists = this.state.playLIstList;
    playLists.push(this.state.playlistName)
    Spotify.savePlaylist(this.state.playlistName ,trackURIs)
    .then( () => {this.setState({
      playlistName: "New Playlist",
      playlistTracks: [],
      playLIstList: playLists
    })})
    
  }    
  
  updatePlaylistName(name){
      this.setState({playlistName: name})
  }

  addTrack(track){
    let tracks = this.state.playlistTracks
    if(tracks.find(trc => trc.id === track.id)  ) {
      return
    } 
      tracks.push(track);
      this.setState({playlistTracks: tracks});
  }

  removeTrack(track){
    let tracks = this.state.playlistTracks
    if(tracks.find(trc => trc.id === track.id)  ) {
      tracks.pop(track);
      this.setState({playlistTracks: tracks});
    } 
  }

  render(){
    return (
      <div>
    <h1>Ja<span className="highlight">mmm</span>ing</h1>
    <div className="App">
      <SearchBar onSearch={this.search} />
      <div className="App-playlist">
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} 
      onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
      <PlaylistList playLIstList={this.state.playLIstList} />
      </div>
    </div>
  </div>)
  }
}

export default App
