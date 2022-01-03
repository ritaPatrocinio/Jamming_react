let clientID = 'e8a4e5eab75345febab08c3991c5ebdf';
let redirectUri = 'https://infamous-border.surge.sh/';

let accessToken;
let userID;

const Spotify = {

    getCurrentUserId(){
        let headers = {Authorization: `Bearer ${accessToken}`};
        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userID = jsonResponse.id;
            // return userID
    } 
        )},
        
    search(term){
        const accessToken = Spotify.getAccessToken();
        
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {Authorization: `Bearer ${accessToken}`}
          })
          .then(response => { return response.json()} )
          .then(jsonResponse => {
            if(!jsonResponse.tracks){
                return []
            } 

            const results = jsonResponse.tracks.items.map(track => ( {  
                        id: track.id,
                        name: track.name,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        uri: track.uri } ) ) 

            return results;
            } )
    },

    savePlaylist(PlaylistName, trackURIs){
        if(!PlaylistName || !trackURIs.length){ 
            return};
        
        let accessToken = Spotify.getAccessToken();
        let headers = {Authorization: `Bearer ${accessToken}`};
        let userID;

        return fetch('https://api.spotify.com/v1/me', {headers: headers})
        .then(response => response.json())
        .then(jsonResponse => {
            userID = jsonResponse.id;

            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({name: PlaylistName})
            })
        }).then(response => response.json())
        .then(jsonResponse => {
            let playlistID = jsonResponse.id;
            console.log(jsonResponse.id);

            return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks
            `,
            {
                headers: headers,
                method: 'POST',
                body: JSON.stringify({uris: trackURIs})
            })
        })
    },

    getAccessToken(){
        if(accessToken) {
            return accessToken;
        }
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    
    if(accessTokenMatch && expiresInMatch){
        accessToken = accessTokenMatch[1];
        const expiresIn = Number(expiresInMatch[1]);

        window.setTimeout(() => accessToken = '' , expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        return accessToken;
    } else {
        const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = accessUrl;
    }
    },

    getUserPlaylists(){}
};

export default Spotify;