
    const div_paper = document.getElementById("paper");
    const userScore_span = document.getElementById("player-score");
    const div_rock = document.getElementById("rock");
    const compScore_span = document.getElementById("comp-score");
    const score_board_div = document.getElementsByClassName(".scorz");
    const div_scissors = document.getElementById("scissors");
    const NumberOfRounds_span = document.getElementById("NumberOfRounds");
    let userScore = 0;
    let compScore = 0;
    let Roundnumber = 0;

    function ComputerChoice() {
        const options = ['rock','paper','scissors'];
        const ran_No = Math.floor(Math.random()*3);
        console.log(ran_No)
        return options[ran_No];
    }

    function NumberOfRounds(user, computer) {
        if (userScore == 5 || compScore == 5) {
        Roundnumber++
    NumberOfRounds_span.innerHTML = Roundnumber;

    userScore = 0;
    compScore = 0;
    userScore_span.textContent = userScore;
    compScore_span.textContent = compScore;
    Outcome(`${user} wins the round against ${computer}`)

    }

    }

    function Outcome(result) {
        document.getElementById('round-outcome').innerHTML = result;
    }
    function play_result(result) {
        document.getElementById('result-text').innerHTML = result;
    }

    function removeBorder() {
        let options = document.querySelectorAll(".option")
        for (let i = 0; i < options.length; i++) {
            options[i].classList.remove("glowing_green");
            options[i].classList.remove("glowing_blue");
            options[i].classList.remove("glowing_red");
        }
        let optionsIcons = document.querySelectorAll(".option i")
        for (let i = 0; i < optionsIcons.length; i++) {
            optionsIcons[i].classList.remove("glowing_green");
            optionsIcons[i].classList.remove("glowing_blue");
            optionsIcons[i].classList.remove("glowing_red");
        }
    }
      

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
        NumberOfRounds()
    }

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

    round();
