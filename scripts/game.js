var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(() => {
    if (!started) {
        $('#level-title').text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $('#level-title').text(`Level ${level}`);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`#${randomChosenColor}`).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    var userPatternCurrentLevel = userClickedPattern[currentLevel];
    var gamePatternCurrentLevel = gamePattern[currentLevel];

    if (userPatternCurrentLevel === gamePatternCurrentLevel) {
        console.log('success');
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {
        console.log('wrong');
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(() => {
            $('body').removeClass('game-over');
        }, 200);
        $('h1').text("Game Over, Press Any Key To Restart");

        startOver();
    }
}

function animatePress(currentColor) {
    $(`#${currentColor}`).addClass('pressed');
    setTimeout(() => {
        $(`#${currentColor}`).removeClass('pressed');
    }, 100)
}