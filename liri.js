require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var fs = require("fs");
var moment = require('moment');

var search = process.argv[2];
var param = process.argv.slice(3).join("+")

runLIRI(search, param);

function runLIRI(choice, term) {
    switch (choice) {
        case "concert-this":
            concertThis(term);
            break;
        case "spotify-this-song":
            spotifyThis(term);
            break;
        case "movie-this":
            movieThis(term);
            break;
        case "do-what-it-says":
            doThis();
            break;
        default:
            console.log("Please make sure your request is formatted correctly.");
    }
}

function logError() {
    console.log("Could not write to log.txt.")
}

function concertThis(string) {
    var queryURL = "https://rest.bandsintown.com/artists/" + string + "/events?app_id=codingbootcamp";
    axios.get(queryURL)
        .then(function (response) {
            fs.appendFile("log.txt", "Concert-This: " + string, function (err) {
                if (err) {
                    logError();
                }
            })
            for (var i = 0; i < 5; i++) {
                console.log("Venue: " + response.data[i].venue.name);
                console.log("Location: " + response.data[i].venue.city);
                console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
                console.log("----------")

                fs.appendFile("log.txt",
                    "  Venue: " + response.data[i].venue.name +
                    "  Location: " + response.data[i].venue.city +
                    "  Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY") + "  ", function (err) {
                        if (err) {
                            logError();
                        }
                    })
            }
        })
        .catch(function (err) {
            console.log(err);
        })
}

function spotifyThis(string) {
    var maxres = 5;
    if (string === "") {
        string = "the sign ace of base";
        maxres = 1;
    }
    spotify.search({ type: 'track', query: string, limit: maxres }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        fs.appendFile("log.txt", "Spotify-This-Song: " + string, function (err) {
            if (err) {
                logError();
            }
        })
        for (var i = 0; i < data.tracks.items.length; i++) {
            var oneTrack = data.tracks.items[i].album;
            var artistsName = oneTrack.artists;
            var trackArtists = "";
            if (artistsName.length = 1) {
                trackArtists = artistsName[0].name
            }
            else if (artistsName.length = 2) {
                trackArtists = artistsName[0].name + " and " + artistsName[1].name;
            }
            else {
                for (var j = 0; j < artistsName.length; j++) {
                    trackArtists = trackArtists + artistsName[j].name + ", "
                }
            }
            console.log("Artist(s): " + trackArtists);
            console.log("Song Title: " + data.tracks.items[i].name);
            console.log("Spotify Link: " + oneTrack.href);
            console.log("Album: " + oneTrack.name);
            console.log("----------")

            fs.appendFile("log.txt",
                "  Artist(s): " + trackArtists +
                "  Song Title: " + data.tracks.items[i].name +
                "  Spotify Link: " + oneTrack.href +
                "  Album: " + oneTrack.name + "  ", function (err) {
                    if (err) {
                        logError();
                    }
                })
        }
    });
}


function movieThis(string) {
    if (string === "") {
        string = "mr+nobody"
    }
    var queryURL = "http://www.omdbapi.com/?t=" + string + "&apikey=trilogy";
    axios.get(queryURL)
        .then(function (response) {
            if (response.data.Error) {
                console.log("No movie found.");
                return;
            }
            fs.appendFile("log.txt", "Movie-This: " + string, function (err) {
                if (err) {
                    logError();
                }
            })
            var tomato = ""
            for (var i = 0; i < response.data.Ratings.length; i++) {
                var ratingInfo = response.data.Ratings[i]
                if (ratingInfo.Source === "Rotten Tomatoes") {
                    tomato = ratingInfo.Value;
                }
            }
            console.log("Title: " + response.data.Title);
            console.log("Released: " + response.data.Released);
            console.log("IMDB Rating: " + response.data.imdbRating);
            if (tomato !== "") {
                console.log("Tomatometer: " + tomato);
            }
            else console.log("No Rotten Tomatoes Score Found.");
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Summary: " + response.data.Plot);
            console.log("Starring: " + response.data.Actors);

            fs.appendFile("log.txt",
                "  Title: " + response.data.Title +
                "  Released: " + response.data.Released +
                "  IMDB Rating: " + response.data.imdbRating +
                "  Tomatometer: " + tomato +
                "  Country: " + response.data.Country +
                "  Language: " + response.data.Language +
                "  Summary: " + response.data.Plot +
                "  Starring: " + response.data.Actors + "  ", function (err) {
                    if (err) {
                        logError();
                    }
                })

        })
        .catch(function (err) {
            console.log(err);
        })
}

function doThis() {
    fs.readFile("random.txt", "utf8", function (err, data) {
        if (err) {
            console.log("File Read Error");
        }
        fs.appendFile("log.txt", "Do What It Says: read from random.txt!  ", function (err) {
            if (err) {
                logError();
            }
        })
        var inputArray = data.split(",")
        if (inputArray.length === 2) {
            if (inputArray[0] === "concert-this" ||
                inputArray[0] === "spotify-this-song" ||
                inputArray[0] === "movie-this") {
                search = inputArray[0];
            }
            else {
                console.log("Please make sure random.txt is formatted correctly.")
                return;
            }
            param = inputArray[1];
            runLIRI(search, param);
        }
        else {
            console.log("Please make sure random.txt is formatted correctly.");
        }

    })

    //    * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

    //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

    //      * Edit the text in random.txt to test out the feature for movie-this and concert-this.
}