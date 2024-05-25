var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var level=0;
var started=false;

$("body").on("keypress", function(){
    if (started===false) {
        nextSequence();
        started=true;
    }
    })

function nextSequence(){
    userClickedPattern=[];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    $("h1").text("Level "+level);
    level++;
}


$(".btn").on("click", function handler(){
    var userChosenColor= $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel){

    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if (gamePattern.length===userClickedPattern.length) {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key To Restart");
        startOver();
        }
    
}


function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function(){
        $("."+currentColour).removeClass("pressed");
    }, 100);
}

function playSound(name){
    var audio=new Audio("./sounds/"+name+".mp3");
    audio.play();
}