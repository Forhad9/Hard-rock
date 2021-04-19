let searchButton = () => {
    document.getElementById("lyrics-container").style.display = "none";
    document.getElementById("lyrics-container").innerText =``;
    document.getElementById("song-container").innerText =``;
    const searchSong = document.getElementById("searchValue").value;
    const url = `https://api.lyrics.ovh/suggest/:${searchSong}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
}

let displaySongs = songs => {
    console.log(songs);
    const songContainer = document.getElementById("song-container");
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
        <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio class="audioFrom" controls>
           <source src="${song.preview}" type="audio/mpeg">
      </audio>
      </div>
       <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${song.artist.name}','${song.title}')"; class="btn btn-success">Get Lyrics</button>
        
     </div>
        
        `;
        songContainer.appendChild(songDiv);

    });

}


let getLyrics = (artist, title) =>{
    let url =`https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
    .then(res => res.json())
    .then(data => showLyrics(data.lyrics));
    
}
let showLyrics = lyrics =>{
    document.getElementById("lyrics-container").style.display = "block";
    const lyricsDiv = document.getElementById("lyrics-container");
    
        lyricsDiv.innerText = lyrics;
        
       
        
    
}