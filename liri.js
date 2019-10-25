require("dotenv").config();
const axios = require('axios');
const Spotify = require('node-spotify-api');
const moment = require('moment');

var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

const bands = function(artist) {
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

// bands(process.argv[2]);


const songs = function(song) {
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

songs(process.argv[2]);


if (process.argv[2] === 'concert-this') {
    bands(process.argv[3])
} else if (process.argv[2] === 'spotify-this-song') {
    songs(process.argv[3])
}