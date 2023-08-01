//setting up three zones 1) header 2) searchZone 3)resultsBox
let header = document.querySelector("header");
let searchZone = document.querySelector("#searchZone");
let resultsBox = document.querySelector("#resultsBox");
const form = document.getElementById("searchZone");
const searchTerm = document.getElementById("searchTerm");
const musicPlayer = document.getElementById("musicPlayer");
musicPlayer.volume = 0.2;
const figCaption = document.getElementById("figCaption");

//setting up a shortcut for the search bar  url becomes the first part of the fetch so
// the search terms can be added later
let url = "https://proxy-itunes-api.glitch.me/search?term=";

//if there is a first child it will trigger this while statement
function clear(container) {
  while (container.firstChild) {
    //remove the contents of container if there is a child inside
    container.removeChild(container.firstChild);
  }
}

function search() {
  //getting the information
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(searchTerm.value);

    //checking to see if searchTerm is empty, if so log "please enter a search term"
    if (searchTerm === "") {
      console.log("Please Enter A Search Term");
      return;
    }

    clear(resultsBox);

    fetch(url + searchTerm.value, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      //asking for the infomation in json format -- return the promise this way
      .then((response) => {
        return response.json();
      })
      //when promise comes back log data.results (results because thats what the api is calling it)
      // fills song with what we want to display
      .then((data) => {
        console.log(data);
        for (let song of data.results) {
          console.log(`song name ${song.trackName}`);

          let songBox = document.createElement("div");
          //where im adding class
          songBox.classList.add("songBox");
          resultsBox.appendChild(songBox);

          //code to display the image for each song returned
          let picDiv = document.createElement("img");
          picDiv.src = song.artworkUrl100;
          //adding class i defined in css to round the image borders
          picDiv.classList.add("imgRounder");
          songBox.appendChild(picDiv);

          //code to display the song name
          let songDiv = document.createElement("p");
          let strongElement = document.createElement("strong");
          strongElement.innerText = song.trackName;
          songBox.appendChild(strongElement);
          songBox.appendChild(songDiv);

          //code to display the band name
          let bandDiv = document.createElement("p");
          bandDiv.innerText = song.artistName;
          songBox.appendChild(bandDiv);

          const playSong = () => {
            //added listener for song box to snag the track name to use in
            // the audio preview
            songBox.addEventListener("click", (event) => {
              console.log(song.trackName);
              musicPlayer.src = song.previewUrl;
              figCaption.innerText = `   Now Playing: ${song.artistName} - ${song.trackName}`;
            });
          };
          playSong();
        }
      });
  });
}

search();
