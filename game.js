var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern=[];

var started=false;

var level= 0;

$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started=true;
    }
})
//to detect weather any btn is clicked or not
$(".btn").click(function(){
    //variable to store userchosen color
    var userChosenColour = $(this).attr("id");

    //adding the content of the variable userChosenColour to the end of userClickedPattern

    userClickedPattern.push(userChosenColour);
    
    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
})



function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {
      console.log("wrong");

      //if wrong play wrong sound
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass(game-over)
      },200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}




function nextSequence(){

    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+ level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    // Select the button with the same ID as randomChosenColour and add a class for styling
    $("#" +randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
   // how you can use Javascript to play the sound for the button colour selected in step 1.
    playSound(randomChosenColour);
}


//function to play sound
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}


//function for animatePress()
function animatePress(currentColor){
    //adding pressed class to the button which gets clicked
    $("#"+currentColor).addClass("pressed");

    //one pressed effect comes remove it within a second using set time out

    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}


function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}