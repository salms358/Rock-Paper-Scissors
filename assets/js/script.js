  
  document.addEventListener('DOMContentLoaded', function() {
  /*Defining all of the variables needed in the project including the scores and the displaying of the scores*/
    const divPaper = document.getElementById("paper");
    const userScoreSpan = document.getElementById("player-score");
    const divRock = document.getElementById("rock");
    const compScoreSpan = document.getElementById("comp-score");
    const scoreBoardDiv = document.getElementsByClassName(".scorz");
    const divScissors = document.getElementById("scissors");
    const numberOfRoundsspan = document.getElementById("NumberOfRounds");
    /*All of the scores involved in the game*/
    let userScore = 0;
    let compScore = 0;
    let RoundNumber = 0;
    let userScoreEmail = 0;
    let compScoreEmail = 0;
   
 /*generates a random choice from the computer so that it can be later compared with the user scores to determine who wins the round*/
    function  computerChoices() {
        const options = ['rock','paper','scissors'];
        const ran_No = Math.floor(Math.random()*3);
        console.log(ran_No);
        return options[ran_No];
    }
/*Makes sure the Round number is increased, displays the statement showing who won and the amount of rounds it took for either the user or the computer to win. Moreover this function 
involves the form being hidden for the duraation of the game until the user is the winner*/
    function numberOfRounds() {
        RoundNumber++;
        document.getElementById('form').classList.add('hide');
        numberOfRoundsspan.innerHTML = RoundNumber;
        if (userScore == 5 || compScore == 5)  {
            if (userScore == 5) {
                outCome(`User wins against Computer ${userScore} to ${compScore} in ${RoundNumber} rounds`);
                document.getElementById('form').classList.remove('hide');
            }
            else{
                outCome(`Computer wins against User ${compScore} to ${userScore} in ${RoundNumber} rounds`);
            }
            userScoreEmail = userScore;
            compScoreEmail = compScore;
            RoundNumber = 0;
            userScore = 0;
            compScore = 0;
           /*Makes sure the round number and scores are shown for limited time until the scores reset*/
            setTimeout(function() {
                userScoreSpan.textContent = userScore;
                compScoreSpan.textContent = compScore;
                numberOfRoundsspan.innerHTML = RoundNumber;
                document.getElementById('round-outcome').classList.add('hide');
            }, 10000);
        }

    }
/*The functions that is called to display the round outcome*/
    function outCome(result) {
        document.getElementById('round-outcome').classList.remove('hide');
        document.getElementById('round-outcome').innerHTML = result;
    }
    /*Is called to determine how the user wins loses or draws e.g.rock overpowers paper, you win*/
    function playResult(result) {
        document.getElementById('result-text').innerHTML = result;
    }
/*Makes sure the borders of the icons stop glowing after another option is clicked*/
    function removeBorder() {
            let options = document.querySelectorAll(".option");
                for (let i = 0; i < options.length; i++) {
                    options[i].classList.remove("glowing_green");
                    options[i].classList.remove("glowing_blue");
                    options[i].classList.remove("glowing_red");
                }
        let optionsIcons = document.querySelectorAll(".option i");
                for (let i = 0; i < optionsIcons.length; i++) {
                    optionsIcons[i].classList.remove("glowing_green");
                    optionsIcons[i].classList.remove("glowing_blue");
                    optionsIcons[i].classList.remove("glowing_red");
                }
    }
      
/*Code from emailJS so that a email showing the scores is sent to the user*/
    function sendEmail(){
      console.log("CompScoreEmail, UserScoreEmail, userScore, compScore", compScoreEmail, userScoreEmail, userScore, compScore);
            let templateParams = {
                user_email: document.getElementById('email_address').value,
                score: userScoreEmail,
                compScore: compScoreEmail,
            };
        
        emailjs.send('service_3otnutb', 'template_cebba9n', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
    }
 /*End of the email JS code*/
 /*The win, lose and draw functions are to make sure the scoreboard is updated the score is only incremented when the user wins or loses 
 as drawing does not impact the score*/
    function win(user, computer) {
        userScore++;
        userScoreSpan.innerHTML = userScore;
        playResult(`${user} overpowers ${computer}, you won`);
    }
        
    function draw() {
        userScoreSpan.innerHTML = userScore;
        playResult(`Its a draw`);         
    }
        
    
    function lose(user, computer) {
        userScoreSpan.innerHTML = userScore;
        compScore++;
        compScoreSpan.innerHTML = compScore;
        playResult(`${computer} overpowers ${user}, you lost`);
        
    }
    

/*Shows all of the possble choices that the user and computer makes it allows their choices to be compared. The 
win draw and lose functions are called here to ensure that the program knows which combinations have the outcome of win, draw or lose*/
    function rockpaperScissors(userChoice, pressedButton) {
        const computerChoice = computerChoices();
        console.log(`Computer plays ${computerChoice}`);
        removeBorder();
        switch (computerChoice + userChoice) {
            case "paperscissors":
            case "rockpaper":
            case "scissorsrock":
                pressedButton.classList.add("glowing_green");
                win(userChoice, computerChoice);
            break;
            case "scissorspaper":
            case "rockscissors":
            case "paperrock":
                lose(userChoice, computerChoice);
                pressedButton.classList.add("glowing_red");
                break;
            case "rockrock":
            case "paperpaper":
            case "scissorsscissors":
                draw();
                pressedButton.classList.add("glowing_blue");
                break;   
        }
     /*The number of rounds is called here to make sure that that after the scores are updated the round number should go up by 1*/
     numberOfRounds();
    }
   /*Identifies the button clicked e.g. when i click rock the computer knows ive clicke the rock button*/
    function clickButton() {
        divPaper.addEventListener('click', function(event) {
            rockpaperScissors("paper",  event.target);
    });
        divRock.addEventListener('click',  function(event) {
            rockpaperScissors("rock", event.target);
    });
        divScissors.addEventListener('click',  function(event) {
            rockpaperScissors("scissors", event.target);
            });
        
        }

        clickButton();
 /*Makes sure the email is submitted to the users email*/
    document.getElementById('submit').addEventListener('click', function(){
        sendEmail();
    });

    console.log('Document is ready!');
});