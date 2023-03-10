  /*Defining all of the variables needed in the project including the scores and the displaying of the scores*/
    const div_paper = document.getElementById("paper");
    const userScore_span = document.getElementById("player-score");
    const div_rock = document.getElementById("rock");
    const compScore_span = document.getElementById("comp-score");
    const score_board_div = document.getElementsByClassName(".scorz");
    const div_scissors = document.getElementById("scissors");
    const NumberOfRounds_span = document.getElementById("NumberOfRounds");
    /*All of the scores involved in the game*/
    let userScore = 0;
    let compScore = 0;
    let Roundnumber = 0;
    let UserScoreEmail = 0;
    let CompScoreEmail = 0;
   
 /*generates a random choice from the computer so that it can be later compared with the user scores to determine who wins the round*/
    function ComputerChoice() {
        const options = ['rock','paper','scissors'];
        const ran_No = Math.floor(Math.random()*3);
        console.log(ran_No);
        return options[ran_No];
    }
/*Makes sure the Round number is increased, displays the statement showing who won and the amount of rounds it took for either the user or the computer to win. Moreover this function 
involves the form being hidden for the duraation of the game until the user is the winner*/
    function NumberOfRounds() {
        Roundnumber++;
        document.getElementById('form').classList.add('hide')
        NumberOfRounds_span.innerHTML = Roundnumber
        if (userScore == 5 || compScore == 5)  {
            if (userScore == 5) {
                Outcome(`User wins against Computer ${userScore} to ${compScore} in ${Roundnumber} rounds`)
                document.getElementById('form').classList.remove('hide')
            }
            else{
                Outcome(`Computer wins against User ${compScore} to ${userScore} in ${Roundnumber} rounds`)
            }
            UserScoreEmail = userScore;
            CompScoreEmail = compScore;
            Roundnumber = 0;
            userScore = 0;
            compScore = 0;
           /*Makes sure the round number and scores are shown for limited time until the scores reset*/
            setTimeout(function() {
                userScore_span.textContent = userScore;
                compScore_span.textContent = compScore;
                NumberOfRounds_span.innerHTML = Roundnumber;
                document.getElementById('round-outcome').classList.add('hide')
            }, 10000);
        }

    }
/*The functions that is called to display the round outcome*/
    function Outcome(result) {
        document.getElementById('round-outcome').classList.remove('hide');
        document.getElementById('round-outcome').innerHTML = result;
    }
    /*Is called to determine how the user wins loses or draws e.g.rock overpowers paper, you win*/
    function play_result(result) {
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
      console.log("CompScoreEmail, UserScoreEmail, userScore, compScore", CompScoreEmail, UserScoreEmail, userScore, compScore);
            let templateParams = {
                user_email: document.getElementById('email_address').value,
                score: UserScoreEmail,
                compScore: CompScoreEmail,
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
        userScore++
        userScore_span.innerHTML = userScore;
        play_result(`${user} overpowers ${computer}, you won`);
    }
        
    function draw() {
        userScore_span.innerHTML = userScore;
        play_result(`Its a draw`);         
    }
        
    
    function lose(user, computer) {
        userScore_span.innerHTML = userScore;
        compScore++;
        compScore_span.innerHTML = compScore;
        play_result(`${computer} overpowers ${user}, you lost`);
        
    }
    

/*Shows all of the possble choices that the user and computer makes it allows their choices to be compared. The 
win draw and lose functions are called here to ensure that the program knows which combinations have the outcome of win, draw or lose*/
    function rps(userChoice, pressedButton) {
        const computerChoice = ComputerChoice();
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
                draw()
                pressedButton.classList.add("glowing_blue");
                break;   
        }
        /*The number of rounds is called here to make sure that that after the scores are updated the round number should go up by 1*/
        NumberOfRounds()
    }
/*Identifies the button clicked e.g. when i click rock the computer knows ive clicke the rock button*/
    function round() {
        div_paper.addEventListener('click', function(event) {
        rps("paper",  event.target)
    })
        div_rock.addEventListener('click',  function(event) {
        rps("rock", event.target)
    })
        div_scissors.addEventListener('click',  function(event) {
        rps("scissors", event.target)
            })
        
        }

    round()
 /*Makessure the email is submitted to the users email*/
    document.getElementById('submit').addEventListener('click', function(){
        sendEmail()
    });
