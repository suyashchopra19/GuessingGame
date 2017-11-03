
var Game = function() {
    this.playersGuess = null;
    this.winningNumber = generateWinningNumber();
    this.pastGuesses = [];
}

function generateWinningNumber() {
    return Math.ceil(Math.random()*100);
}


function newGame() {
    return new Game(); //check that old game !== new game
}

Game.prototype.difference = function() {
    return Math.abs(this.playersGuess-this.winningNumber);
}

Game.prototype.isLower = function() {
    return this.playersGuess < this.winningNumber;
}

Game.prototype.playersGuessSubmission = function(guess) {
    if(typeof guess !== 'number' || guess < 1 || guess > 100) {
        throw "That is an invalid guess.";
    }
    this.playersGuess = guess;
    return this.checkGuess();
}

Game.prototype.checkGuess = function() {
    if(this.playersGuess===this.winningNumber) {
        $('#hint,#submit').prop('disable',true);
        $('#subtitle').text('Reset to Play Again');

        return 'You Win!'
    }
    else {
        if(this.pastGuesses.indexOf(this.playersGuess) > -1) {
            return 'You have already guessed that number.';
        }
        else {
            this.pastGuesses.push(this.playersGuess);
            $('#guess-list li:nth-child('+ this.pastGuesses.length +')').text(this.playersGuess);// this is nice
            if(this.pastGuesses.length === 5) {
                 $('#submit').prop("disabled",true);
                $('#subtitle').text("Reset button to play again!")
                return 'You Lose.';
            }
            else {
                var diff = this.difference();
                if(this.isLower()) { //this.isLower is a method we have created.
                    $('#subtitle').text("Guess Higher!")
                } else {
                    $('#subtitle').text("Guess Lower!")
                }
                console.log(this.isLower);
                console.log(this.winningNumber);
                if(diff < 10) return'You\'re burning up!';
                else if(diff < 25) return'You\'re lukewarm.';
                else if(diff < 50) return'You\'re a bit chilly.';
                else return'You\'re ice cold!';
            }
        }
    }
}

Game.prototype.provideHint = function() {
    var hintArray = [this.winningNumber, generateWinningNumber(), generateWinningNumber(),generateWinningNumber(),generateWinningNumber(),generateWinningNumber(),generateWinningNumber()];
    return shuffle(hintArray);
}

function shuffle(arr) {
   for(var i = arr.length-1; i > 0; i--) {
       var randomIndex = Math.floor(Math.random() * (i + 1));
       var temp = arr[i];
       arr[i] = arr[randomIndex];
       arr[randomIndex] = temp;
    }
    return arr;
}

$(document).ready(function(){
    var game = new Game();
    
    $("#submit").click(function(){
        var guess = $("#player-input").val();
        // console.log(guess);
        var output = game.playersGuessSubmission(parseInt(guess));
        console.log(output);
        $('#title').text(output);
    });

    $('#player-input').keypress(function(){
        if(event.which==13){ //that is the event for the enter key 
            var guess = $("#player-input").val();
            // console.log(guess);
            var output = game.playersGuessSubmission(parseInt(guess));
            console.log(output);
            $('#title').text(output);
        }
    })

    // hint and reset

    $('#hint').click(function(){
        var hints = game.provideHint();
        $('#title').text("The winning numbers could be"+hints[0]+', '+hints[1]+', '+hints[2]+', '+hints[3]+', '+hints[4]+', '+hints[5]+', or '+hints[2]);
        $('#hint').prop('disabled',true);
    });

    //reset 
    $('#reset').click(function(){
        game = new Game();
        $('#title').text('Play the Guessing Game!');
        $('#subtitle').text('Guess a number between 1-100!')
        $('.guess').text('-');
        $('#hint, #submit').prop("disabled",false);
    })
});
















