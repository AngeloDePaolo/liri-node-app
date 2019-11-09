require("dotenv").config();
const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');
const fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

const findMyBand = function(artist) {
    const url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(url)
    .then(function (response) {
        // console.log(response.data);
        for (i = 0; i < response.data.length; i++) {
          console.log('Name: ' + response.data[i].venue.name + ' Location: ' + response.data[i].venue.city + ', ' + response.data[i].venue.region + ', ' + response.data[i].venue.country + ' Date: ' + moment(response.data[i].datetime).format("MM-DD-YYYY"))
        }
    })
    .catch(function (error) {
        console.log(error);
      });
};

// findMyBand(process.argv[2]);


const findMySong = function(song) {
    if (song === undefined) {
        song = "The Sign"
    }
    
    spotify.search({ type: 'track', query: song, limit: 3 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       
    //   console.log(data.tracks.items);
      for (i = 0; i < data.tracks.items.length; i++) {
        console.log('Album: ' + data.tracks.items[i].album.name + ' Song: ' + data.tracks.items[i].name + ' Artist(s): ' + data.tracks.items[i].artists.map(artist => artist.name) + ' Song Preview ' + data.tracks.items[i].preview_url)
      } 
      });
};

findMySong(process.argv[2]);


if (process.argv[2] === 'concert-this') {
    findMyBand(process.argv[3])
} else if (process.argv[2] === 'spotify-this-song') {
  findMySong(process.argv[3])
}


var findMyMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Mr Nobody";
  }

  var urlHit =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(urlHit).then(
    function(response) {
      var jsonData = response.data;

      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  );
};

// Function for running a command based on text file
var doWhatItSays = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Function for determining which command is executed
var pick = function(caseData, functionData) {
  switch (caseData) {
  case "concert-this":
    findMyBand(functionData);
    break;
  case "spotify-this-song":
    findMySong(functionData);
    break;
  case "movie-this":
    findMyMovie(functionData);
    break;
  case "do-what-it-says":
    doWhatItSays();
    break;
  default:
    console.log("LIRI doesn't know that");
  }
};

// Function which takes in command line arguments and executes correct function accordingly
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
runThis(process.argv[2], process.argv.slice(3).join(" "));
