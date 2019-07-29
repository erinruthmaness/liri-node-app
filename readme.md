## LIRI - Language Interpretation and Recognition Interface
[Github Repository](https://github.com/erinruthmaness/liri-node-app)

This app searches multiple online databases to provide information regarding songs, films, or even upcoming concerts upon request.

The user can call one of this app's functions by entering one of these commands:
1. `node liri.js concert-this <artist/band name here>`
![Concert-This Demo](/images/concert-this.gif)
   * This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:
     * Name of the venue
     * Venue location
     * Date of the Event

2. `node liri.js spotify-this-song <song name here>`
![Spotify-This-Song Demo](/images/spotify-this-song.gif)
   * This will use the Spotify API to show the following information about the song in the user's terminal/bash window:
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from
   * Please make sure to provide your own Spotify API Key in a .env file.

3. `node liri.js movie-this <movie name here>`
![Movie-This Demo](/images/movie-this.gif)
   * This will output the following information from the OMDB API to the user's terminal/bash window:
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.

4. `node liri.js do-what-it-says`
![Do-What-It-Says Demo](/images/do-what-it-says.gif)
   * LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.  The user can edit the text in random.txt to test out the feature for any of LIRI's three commands.

All information returned to the terminal will also be logged into a file called log.txt.


