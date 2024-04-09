// ==UserScript==
// @name        Read youtube video data
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      - Sjatar
// @description 05/04/2024, 19:49:56
// ==/UserScript==

var websocketArguments = 'ws://127.0.0.1:8080/';
var socket;
var DataFromSocket;
let updateTabData;

createWebsocket();

window.onbeforeunload = function(){
  socket.close();
  return null;
}

function onError(error)
{
   console.log(`Error: ${error}`);
}

function createWebsocket()
{
	console.log("Trying to establish Websocket!");
	socket = new WebSocket(websocketArguments);
	socket.onerror = onWebSocketError;
	socket.onopen = onWebSocketOpen;
}

function onWebSocketError(event)
{

	if (updateTabData) {
		clearInterval(updateTabData);
		updateTabData = undefined;
	}

	console.log("WebSocket error observed:", event);
	console.log("Error detected, trying to reconnect in 1 sec")
	setTimeout(createWebsocket(), 1000);
};

function onWebSocketClose(event)
{

	if (updateTabData) {
		clearInterval(updateTabData);
		updateTabData = undefined;
	}

	console.log("Connection to websocket closed, trying to reconnect in 1 sec")
	setTimeout(createWebsocket(), 1000);
}

function onWebSocketOpen(event)
{
	console.log("WebSocket open: ", socket.readyState);

	socket.onclose = onWebSocketClose;

	socket.addEventListener("message", (event) => {
		DataFromSocket = JSON.parse(event.data);
	});

	if (!updateTabData) {
		updateTabData = setInterval(() => {

      if (document.getElementById("movie_player") != null){
        isPlaying = document.getElementById("movie_player").getPlayerState();
        isMuted = document.getElementById("movie_player").isMuted();

        if (isPlaying == 1 && !isMuted) {
          socket.send(JSON.stringify(
          {
            "request": "DoAction",
            "action": {
        	"id": "7090ead5-d1ec-48fa-958a-e99d7cc978ae",
		"name": "YoutubePlayback"
            },
            "args":{
              "YTtitle": document.getElementById("movie_player").getVideoData().title,
              "YTid": document.getElementById("movie_player").getVideoData().video_id,
              "YTtime": Math.floor(document.getElementById("movie_player").getCurrentTime()),
            },
            "id": "124"
          }
          ));
        }
      }else{
        console.log("Did not find element with id movie_player");
      }
    }, 1000);
	}
};
