const user_scores = 0;
const comp_scores = 0;
const userScore_span = document.getElementById("player-score");
const compScore_span = document.getElementById("comp-score");
const score_board_div = document.getElementsByClassName(".resultz");
const div_rock = document.getElementById("rock");
const div_paper = document.getElementById("paper");
const div_scissors = document.getElementById("scissors");
div_paper.addEventListener('click', function () {
console.log("You chose Paper");
})
div_rock.addEventListener('click', function () {
    console.log("You chose Rock");
    })
div_scissors.addEventListener('click', function () {
        console.log("You chose Scissors");
        })