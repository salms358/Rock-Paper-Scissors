
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

    function NumberOfRounds() {
        Roundnumber++;
        document.getElementById('form').classList.add('hide');
        NumberOfRounds_span.innerHTML = Roundnumber;
        if (userScore == 5 || compScore == 5) {
            if (userScore == 5){
                Outcome(`User wins against Computer ${userScore} to ${compScore} in ${Roundnumber} rounds`);
                document.getElementById('form').classList.remove('hide');
            }
            else{
                Outcome(`Computer wins against User ${compScore} to ${userScore} in ${Roundnumber} rounds`);
            }
            Roundnumber = 0;
            userScore = 0;
            compScore = 0;
           
            setTimeout(function(){
                userScore_span.textContent = userScore;
                compScore_span.textContent = compScore;
                NumberOfRounds_span.innerHTML = Roundnumber;
                document.getElementById('round-outcome').classList.add('hide');
            }, 10000);
        }

    }

    function Outcome(result) {
        document.getElementById('round-outcome').classList.remove('hide');
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
      

    function sendEmail(){
        let templateParams = {
            user_email: document.getElementById('email_address').value,
            score: 5,
        };
        
        emailjs.send('service_3otnutb', 'template_cebba9n', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
            console.log('FAILED...', error);
        });
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

    document.getElementById('submit').addEventListener('click', function(){
        sendEmail();
    })
