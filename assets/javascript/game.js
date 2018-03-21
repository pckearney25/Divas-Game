// GLOBAL Game Arrays:

var divaArr = [
  {
    artist: "LADY GAGA",
    ytVideo: "en2D_5TzXCA"
  },
  {
    artist: "CHER",
    ytVideo: "eWeezUxIzaE"
  },
  {
    artist: "WHITNEY HOUSTON",
    ytVideo: "3JWTaaS7LdU"
  },
  {
    artist: "NICKI MINAJ",
    ytVideo: "SeIJmciN8mo"
  },
  {
    artist: "CHRISTINA AGUILERA",
    ytVideo: "kIDWgqDBNXA"
  },
  {
    artist: "MADONNA",
    ytVideo: "GuJQSAiODqI"
  },
  {
    artist: "BEYONCE KNOWLES",
    ytVideo: "4m1EFMoRFvY"
  },
  {
    artist: "TAYLOR SWIFT",
    ytVideo: "AgFeZr5ptV8"
  },
  {
    artist: "MARIAH CAREY",
    ytVideo: "Hat1Hc9SNwE"
  },
  {
    artist: "ARETHA FRANKLIN",
    ytVideo: "KtBbyglq37E"
  },
  {
    artist: "CELINE DION",
    ytVideo: "Y8HOfcYWZoo"
  },
  {
    artist: "JANET JACKSON",
    ytVideo: "vfK5QhZ9u7o"
  },
  {
    artist: "DIANA ROSS",
    ytVideo: "VOH6SzDX3l4"
  },
  {
    artist: "DONNA SUMMER",
    ytVideo: "Nm-ISatLDG0"
  },
  {
    artist: "TINA TURNER",
    ytVideo: "oGpFcHTxjZs"
  },
  {
    artist: "BRITNEY SPEARS",
    ytVideo: "u4FF6MpcsRw"
  }
];

var a2zString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var introMessageArr = [
  "Welcome backstage. Press any key to begin.",
  "Ready to meet your first Diva? Press a key to load the first game."
];

//Global Variables
var wins = 0;
var losses = 0;
var selectedChar;
var finishedRounds = 0;
var maxRounds = divaArr.length;

var gameIntroBool = false; //controls timing of messages and events at game start
var roundIntroBool = false; //controls timing of messages and events at round start.
var roundEndBool = false; //controls timing of messages and events at round end.

var roundDiva = ""; //holds name of artist for current round
var roundDivaArray = []; //holds the artist name broken into letters & spaces
var revealString = "";
var revealArray = [];
var remainingGuesses = 10;
var guessedLetterArray = [];

function playGame() {
  if (gameIntroBool == false) {
    gameIntroBool = true;
    document.getElementById("message").innerText = introMessageArr[1];
    document.getElementById("winScore").innerHTML = wins;
    document.getElementById("lossScore").innerHTML = losses;
    document.getElementById("rounds").innerHTML = finishedRounds;
    initializeRound();
  } else {
    playRound();
  }
}

function initializeRound() {
  roundIntroBool = false; //controls timing of messages and events at round start.
  roundEndBool = false; //controls timing of messages and events at round end.
  roundDiva = ""; //holds name of artist for current round
  roundDivaArray = []; //holds the artist name broken into letters & spaces
  revealString = "";
  revealArray = [];
  remainingGuesses = 10;
  guessedLetterArray = [];

  document.getElementById("guesses").innerHTML = guessedLetterArray;
}

function playRound() {
  console.log(
    "Max Rounds: " + maxRounds + " Completed Rounds: " + finishedRounds
  );

  if (roundIntroBool == false) {
    roundIntroBool = true;
    roundMessages(selectedChar, remainingGuesses, 0);
    intializeArraysAndStrings();
  } else if (a2zString.includes(selectedChar) == false) {
    roundMessages(selectedChar, remainingGuesses, 1);
  } else if (guessedLetterArray.includes(selectedChar) == true) {
    roundMessages(selectedChar, remainingGuesses, 2);
  } else if (roundDivaArray.includes(selectedChar) == true) {
    guessedLetterArray.push(selectedChar);
    document.getElementById("guesses").innerHTML = guessedLetterArray;
    updateRevealArray();
    revealString = updateRevealString(revealArray);
    roundMessages(selectedChar, remainingGuesses, 3);
  } else {
    guessedLetterArray.push(selectedChar);
    document.getElementById("guesses").innerHTML = guessedLetterArray;
    remainingGuesses--;
    roundMessages(selectedChar, remainingGuesses, 4);
  }

  if (
    roundEndBool === false &&
    roundDiva === revealString &&
    remainingGuesses > 0
  ) {
    wins++;
    document.getElementById("winScore").innerHTML = wins;
    roundMessages(selectedChar, remainingGuesses, 5);
    displayDivaVideo();
    finishedRounds++;
    document.getElementById("rounds").innerHTML = finishedRounds;
    roundEndBool = true;
  } else if (
    roundEndBool === true &&
    roundDiva === revealString &&
    remainingGuesses >= 0
  ) {
    initializeRound();
    endRound();
  }

  if (roundEndBool === false && remainingGuesses === 0) {
    losses++;
    document.getElementById("lossScore").innerHTML = losses;
    roundMessages(selectedChar, remainingGuesses, 6);
    finishedRounds++;
    document.getElementById("rounds").innerHTML = finishedRounds;
    roundEndBool = true;
  } else if (roundEndBool === true && remainingGuesses <= 0) {
    initializeRound();
    endRound();
  }
}

function intializeArraysAndStrings() {
  roundDiva = divaArr[finishedRounds].artist;
  roundDivaArray = roundDiva.split("");
  revealArray = noLettersArray(roundDiva);
  revealString = updateRevealString(revealArray);
}

function noLettersArray(stringX) {
  var anArray = stringX.split("");
  for (i = 0; i < anArray.length; i++) {
    if (anArray[i] !== " ") {
      anArray[i] = "_";
    }
  }
  return anArray;
}

function updateRevealString(anArray) {
  var aString = anArray.join("");
  document.getElementById("reveal").innerText = aString;
  return aString;
}

function updateRevealArray() {
  for (i = 0; i < roundDivaArray.length; i++) {
    if (roundDivaArray[i] === selectedChar) {
      revealArray[i] = selectedChar;
    }
  }
}

function roundMessages(varSC, varGL, varNum) {
  var gLeft = varGL;
  var selChar = varSC;
  var roundMessages = [
    "Choose the your first letter by pressing a letter key. You have " +
      gLeft +
      " guesses left.",
    "The selected character '" +
      selChar +
      "' is not a letter. The Diva is feeling generous. Select again.",
    "You have already selected '" +
      selChar +
      "', and the Diva has a tight schedule. Select again. You have " +
      gLeft +
      " guesses left.",
    "The Diva is does have the letter '" +
      selChar +
      "' in her name. Select again. You have " +
      gLeft +
      " guesses left.",
    "The Diva does not have the letter '" +
      selChar +
      "' in her name. Select again. You have " +
      gLeft +
      " guesses left.",
    "You win! The Diva invites you to watch her perform over on the Mainstage. Press any key to meet the next artist.",
    "Sorry, you're out of guesses and the Diva has left the building. Press any key to meet the next artist."
  ];
  document.getElementById("message").innerText = roundMessages[varNum];
}

//Brings up the video for review by the user
function displayDivaVideo() {
  console.log(divaArr[finishedRounds].ytVideo);

  var srcVideoInfo =
    "https://www.youtube.com/embed/" +
    divaArr[finishedRounds].ytVideo +
    "?controls=1";
  console.log(srcVideoInfo);
  var iFramePlayer = document.getElementById("video-div");
  iFramePlayer.setAttribute("src", srcVideoInfo);
}

function endRound() {
  if (finishedRounds === maxRounds && wins === maxRounds) {
    endMessages(0);
  } else if (finishedRounds === maxRounds && wins !== maxrounds) {
    endMessages(1);
  } else {
    playRound();
  }
}

function endMessages(varNum) {
  var endMessageArr = [
    "Congratulations! You have successfully met all of the Divas! You are now a 'Meet the Divas' diva!",
    "Hope you had fun! Come backstage again sometime to try to meet the Divas you missed."
  ];
  document.getElementById("message").innerText = endMessageArr[varNum];
}

/* GAME BEGIN!!!!!*/
document.getElementById("message").innerText = introMessageArr[0];
document.onkeyup = function(event) {
  selectedChar = event.key.toUpperCase();
  playGame();
};
