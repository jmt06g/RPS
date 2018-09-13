// Initialize Firebase
var config = {
	apiKey: "AIzaSyB9J5mCkaiODl6iFiusJSj7IrWJVPfla68",
	authDomain: "rps-multiplayer-b0940.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-b0940.firebaseio.com",
	storageBucket: "rps-multiplayer-b0940.appspot.com",
	messagingSenderId: "867997640650"
};
firebase.initializeApp(config);

//Firebase reference vars
var ref = firebase.database().ref();
var playersRef = firebase.database().ref("players");
var p1Ref = firebase.database().ref("players/1");
var p2Ref = firebase.database().ref("players/2");
var chat = firebase.database().ref("chat");
var connectedRef = firebase.database().ref(".info/connected");
var connectionsRef = firebase.database().ref("connections");

//Local vars
var playerName;
var playerNum;
var playerKey; // unique to session client
var turn = 1;
var timeDelay = 4000;

//Functions
var displayChoices = function(pNum) {
	if(playerNum === pNum) {
		// console.log("display " + pNum);
		var r = $("<div>").text("Rock").attr("data-choice", "Rock").addClass("p" + pNum + "-choice");
		var p = $("<div>").text("Paper").attr("data-choice", "Paper").addClass("p" + pNum + "-choice");
		var s = $("<div>").text("Scissors").attr("data-choice", "Scissors").addClass("p" + pNum + "-choice");
		var rps = $("<div>").append(r, p, s);
		$("#p" + pNum + "-choices").append(rps);	
	}
}

var displayGameMessage = function(type) {
	if(playerNum === 1) {
		if(type === "yourTurn") {
			$("#game-message").text("It's Your Turn!");
			$("#game-message").show();
		} else if(type === "waitingFor") {
			p2Ref.once("value", function(snap) {
				if(snap.exists() === true) {
					$("#game-message").text("Waiting for " + snap.val().name + " to choose...");
				}
			});
			$("#game-message").show();
		}
	} else if(playerNum === 2) {
		if(type === "yourTurn") {
			$("#game-message").text("It's Your Turn!");
			$("#game-message").show();
		} else if(type === "waitingFor") {
			p1Ref.once("value", function(snap) {
				if(snap.exists() === true) {
					$("#game-message").text("Waiting for " + snap.val().name + " to choose...");
				}
			});
			$("#game-message").show();
		}
	}
}
