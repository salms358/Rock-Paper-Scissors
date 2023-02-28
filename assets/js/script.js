
const div_paper = document.getElementById("paper");
const userScore_span = document.getElementById("player-score");
const div_rock = document.getElementById("rock");
const compScore_span = document.getElementById("comp-score");
const score_board_div = document.getElementsByClassName(".scorz");
const div_scissors = document.getElementById("scissors");
let user_scores = 0;
let comp_scores = 0;

function ComputerChoice() {
    const options = ['rock','paper','scissors'];
    const ran_No = Math.floor(Math.random()*3);
    console.log(ran_No)
    return options[ran_No];
    
}

function play_result(result){
    document.getElementById('result-text').innerHTML = result;
}
// ComputerChoice()

function win(user, computer) {
    user_scores++
    userScore_span.innerHTML = user_scores;
    play_result(`${user} overpowers ${computer}, you won`);
}


function draw() {
    userScore_span.innerHTML = user_scores;
    play_result(`Its a draw`);
}

function lose(user, computer) {
    userScore_span.innerHTML = user_scores;
    comp_scores++;
    compScore_span.innerHTML = comp_scores;
    play_result(`${computer} overpowers ${user}, you lost`);
    
 }

// console.log(user_scores)
function rps(user_Choice) {
    const computerChoice = ComputerChoice();
    console.log(`Computer plays ${computerChoice}`);
    switch (computerChoice + user_Choice) {
        case "paperscissors":
        case "rockpaper":
        case "scissorsrock":
            win(user_Choice, computerChoice);
        break;
        case "scissorspaper":
        case "rockscissors":
        case "paperrock":
            lose(user_Choice, computerChoice);
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draw()
            break;   
    }
    
}
function power(userzOp) {
/*power = game*/
    console.log("salma" + userzOp);
}

function round() {
    /*round = main*/
    div_paper.addEventListener('click', function() {
    rps("paper")
})
    div_rock.addEventListener('click',  function() {
    rps("rock")
})
    div_scissors.addEventListener('click',  function() {
    rps("scissors")
        })
    }

round()