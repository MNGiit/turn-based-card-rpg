let selectedTarget;
let selectedActionCard;

let playerName = "Player 1"
let playerHealth = 100;
let enemyHealth = 10;

let playerAttack = 10;
let enemyAttack = 1;

let player1Score = 0;
let player2Score = 0;

let gameIs2PlayerMode = false;
let currentPlayer;

class Fighter {
    constructor(name = "Fighter", health = 3, attack = 1) {
        this.name = name;
        this.health = health;
        this.attack = attack;
        this.cards = [];
    }
    isAlive() {
        if(this.health > 0) return true;
        else return false;
    }
    createAttackCard() {
        let attack = Math.floor(Math.random() * this.attack + 1);
        let c = new Card("Attack", "Simple attack.", attack);
        this.cards.push(c);
    }
    createAttackAllCard() {
        let attack = Math.floor(Math.random() * this.attack/2 + 1);
        let c = new Card("Attack All", "Attack hits all enemies.", attack);
        this.cards.push(c);
    }
    createCards(n = 4) {
        this.cards = [];
        // for(let i = 0; i < n; i++) {
        //     this.createAttackCard();
        // }
        this.createAttackCard();
        this.createAttackCard();
        this.createAttackAllCard();
        this.createAttackAllCard();
    }
}

class Card {
    constructor(name = "Card", description = "", strength = 1) {
        this.name = name;
        this.description = description;
        this.strength = strength;
    }

}

let player = new Fighter(playerName, playerHealth, playerAttack);
let playerTwo = new Fighter("Pkayer 2", playerHealth, playerAttack);

let party = []; // player 1 is team a
party.push(player);
player.createCards();

let enemies = [];
let enemiesCard = document.querySelectorAll(".enemy");

// enemiesCard.forEach(function(card, i){
//     let enemy = new Fighter("Enemy " + (i + 1).toString()); // .toString to get rid of the 0 in Fighter 01
//     enemy.card = enemiesCard[i];
//     enemies.push(enemy);
// })

const selectTarget = (s) => {
    // selected = this; // seems to get the whole window
    // console.log(selected.event);
    if(!selectedActionCard) {
        console.log("Don't do anything.");
        return;
    }
    // set currentPlayer
    // if(gameIs2PlayerMode) {
    //     console.log("Game is in 2 player mode.");
    //     console.log("Current Player is:", currentPlayer);
    // }
    // else {
    //     currentPlayer = party[0]; // player 1 is first in the array
    //     console.log("Current Player is:", currentPlayer)
    // }

    selectedTarget = s; // need some way to correctly get enemy
    enemiesCard.forEach(function(card, i){
        if(s === enemies[i].card) {
            selectedTarget = enemies[i];
            // console.log("Found selected:", selectedTarget);
        }
    })

    // console.log("Attacking target");
    // console.log("Target health is:", selectedTarget.health);
    // selectedTarget.health-=playerAttack;
    // console.log("Player attacks enemy! Enemy health is now:", selectedTarget.health);

    if(currentPlayer.isAlive()) { // player.isAlive()
        if(enemiesCanContinueFight()) {
            // console.log("Attacking target");
            // console.log("Target health is:", selectedTarget.health);
            // selectedTarget.health-=playerAttack;
            // console.log("Player attacks enemy! Enemy health is now:", selectedTarget.health);
            let text = document.createElement("p");
            // text.innerHTML = "Player attacks enemy! Enemy health is now: " + selectedTarget.health;
            // document.querySelector(".messageLogContainer").appendChild(text).scrollIntoView();
            let cardType = selectedActionCard.querySelector(".name").innerHTML;
            console.log(cardType)
            if(cardType === "Attack") {
                let damage = parseInt(selectedActionCard.querySelector(".strength").innerHTML.split("Strength: ")[1])
                // console.log(damage);
                selectedTarget.health-=damage;
                // text.innerHTML = "Player attacks enemy! Enemy health is now: " + selectedTarget.health;
                text.innerHTML = "Player attacks enemy for " + damage + " damage!";
                if(selectedTarget.health <= 0) {
                    // Score
                    // player1Score+=100;
                    // rewardPoints(currentPlayer);
                    rewardCurrentPlayerWithPoints();
                }
            }
            else if(cardType === "Attack All") {
                let damage = parseInt(selectedActionCard.querySelector(".strength").innerHTML.split("Strength: ")[1])
                enemies.forEach(function(enemy) {
                    if(enemy.health > 0) {
                        enemy.health-=damage;
                        if(enemy.health <= 0) {
                            // Score
                            // player1Score+=100;
                            rewardCurrentPlayerWithPoints();
                        }
                    }
                })
                text.innerHTML = "Player attacks each enemy for " + damage + " damage!";
            }
            document.querySelector(".messageLogContainer").appendChild(text).scrollIntoView();
        }
        else {
            openModal();
            console.log("Enemies are defeated. Fighting should stop.");
        }
    }

    let cards = document.querySelectorAll(".card");
    cards.forEach(function(c){
        c.remove();
    })

    // check if there's a player 2
    if(gameIs2PlayerMode) {
        if(party[1].isAlive()) {
            currentPlayer = party[1];
            console.log(currentPlayer);
        }
    }
    else console.log("Game is player 1.");

    // check health of all fighters, and if enemy is alive, attack player
    if(player.isAlive()) {
        if(enemiesCanContinueFight()) {
            enemies.forEach(function(enemy) {
                if(enemy.isAlive()) {
                    // console.log("Enemy attacks player!");
                    player.health-=enemy.attack;
                    // console.log("Player health:", player.health);
                    let text = document.createElement("p");
                    text.innerHTML = "Enemy attacks player!";
                    document.querySelector(".messageLogContainer").appendChild(text).scrollIntoView();
                }
            })
        }
        else {
            // console.log("There are no more enemies to fight. Combat should stop.");
            let text = document.createElement("p");
            text.innerHTML = "There are no more enemies to fight. Combat should stop.";
            document.querySelector(".messageLogContainer").appendChild(text).scrollIntoView();
        }
    }
    else console.log("Player loses! Game over.");

    if(player.isAlive()) {
        player.createCards();
        showCards(player.cards);
    }

    if(!enemiesCanContinueFight()) {
        openModal();
    }

}

const checkHealth = () => {
    if(player.isAlive()) {console.log("Player loses! Game over.");}
    else checkEnemies();
}

const checkEnemies = () => {
    let living = 0;
    for(let i = 0; i < enemies.length; i++) {
        if(enemies[i].isAlive()) {living++;}
    }
    if(living > 0) {
        // console.log("There are still enemies. Combat should continue.")
        let text = document.createElement("p");
        text.innerHTML = "There are still enemies. Combat should continue.";
        document.querySelector(".messageLogContainer").appendChild(text).scrollIntoView();
    }
    else console.log("All enemies are defeated. Combat should end.")
}

const enemiesCanContinueFight = () => {
    let living = 0;
    for(let i = 0; i < enemies.length; i++) {
        if(enemies[i].isAlive()) living++;
    }
    if(living > 0) return true;
    else return false;
}

const createCards = () => {
    let cards = [];
    for(let i = 0; i < 4; i++) {
        cards.push(new Card("Attack", "Pick a target to attack", 3));
    }
    return cards;
}

const showCards = (c) => {
    for(let i = 0; i < c.length; i++) {
        // console.log(c);
        let card = document.createElement("div");
        card.setAttribute("class", "card");
        let name = document.createElement("div");
        name.setAttribute("class", "name");
        name.innerHTML = c[i].name;
        card.appendChild(name);
        // card.style.backgroundColor = "black";
        let strength = document.createElement("div");
        strength.setAttribute("class", "strength");
        strength.innerHTML = `Strength: ${c[i].strength}`;
        card.appendChild(strength);
        card.setAttribute("onclick", "selectActionCard()");
        document.querySelector(".cardsContainer").appendChild(card);
    }
}

const removeCards = () => {
    let cards = document.querySelectorAll(".card");
    for(let i = 0; i < cards.length; i++) {
        cards[i].remove();
    }
}

const removeMessages = () => {
    let messages = document.querySelectorAll(".messageLogContainer p")
    console.log(messages);
    for(let i = 0; i < messages.length; i++) {
        messages[i].remove();
    }
}

const selectActionCard = () => {
    // console.log(this.event.target); // this.event.target
    let cards = document.querySelectorAll(".card");
    if(selectActionCard) {
        for(let i = 0; i < cards.length; i++) {
            cards[i].style.opacity = "1";
            cards[i].style.backgroundColor = "white";
        }
    }
    selectedActionCard = this.event.target;

    for(let i = 0; i < cards.length; i++) {
        if(selectedActionCard != cards[i]) {
            cards[i].style.opacity = "0.2";
            // console.log(cards[i]);
            cards[i].style.backgroundColor = "gray";
        }
    }
}

const openModal = () => {
    let modal = document.querySelector(".modal");
    modal.style.display = "block";
    if(gameIs2PlayerMode) {
        player1Score += party[0].health;
        player2Score += party[1].health;

        if(player1Score > player2Score) {
            modal.querySelector("p").innerHTML = "Players defeated the enemies, congrats!" + `But player 1 score is ${player1Score}, and it's much better than player 2 score, which is a pathetic ${player2Score}`
        }
        else if (player2Score > player1Score) {
            modal.querySelector("p").innerHTML = "Players defeated the enemies, congrats!" + `But player 2 score is ${player2Score}, and it's much better than player 1 score, which is a pathetic ${player1Score}`
        }
        else modal.querySelector("p").innerHTML = "Players did beat the enemies, but wasn't good enough to beat each other. DRAW."
    }
    else {
        player1Score += player.health;
        modal.querySelector("p").innerHTML = "Enemies defeated! You win! Player 1 Score: " + player1Score;
    }

}

// const closeModal = () => {
//     let modal = document.querySelector(".modal");
//     modal.style.display = "none";
// }
// window.onclick = closeModal();

window.onclick = function(event) {
    let modal = document.querySelector(".modal");
    if (event.target == modal) {
      modal.style.display = "none";
      // startBtn.style.display = "block";
      document.querySelector(".rounds").style.display = "block";
      document.querySelector(".battleContainer").style.display = "none";
    }
  } 

showCards(player.cards);


let startBtn = document.querySelector(".start");

const startOne = () => {
    gameIs2PlayerMode = false;
    player1Score = 0;

    removeMessages();

    enemiesCard.forEach(function(card, i){
        let enemy = new Fighter("Enemy " + (i + 1).toString()); // .toString to get rid of the 0 in Fighter 01
        enemy.card = enemiesCard[i];
        enemies.push(enemy);
    })

    document.querySelector(".battleContainer").style.display = "block";
    // startBtn.style.display = "none";
    document.querySelector(".rounds").style.display = "none";
    playerOneTurn();

    currentPlayer = party[0];
}

const startTwo = () => {
    gameIs2PlayerMode = true;
    player1Score = 0;
    player2Score = 0;

    removeMessages();

    enemiesCard.forEach(function(card, i){
        let enemy = new Fighter("Enemy " + (i + 1).toString()); // .toString to get rid of the 0 in Fighter 01
        enemy.card = enemiesCard[i];
        enemies.push(enemy);
    })

    document.querySelector(".battleContainer").style.display = "block";
    // startBtn.style.display = "none";
    document.querySelector(".rounds").style.display = "none";

    player = new Fighter(playerName, playerHealth, playerAttack);
    playerTwo = new Fighter("Player 2", playerHealth, playerAttack);

    party = [];
    party.push(player);
    party.push(playerTwo);

    currentPlayer = party[0];
}

const partyCanContinue = () => {
    let lives = 0;
    for(let i = 0; i < party.length; i++) {
        if(party[i].health > 0) {
            lives++;
        }
    }
    if(lives>0) return true;
    else return false;
}

const playerOneTurn = () => {
    let p2 = document.querySelector(".playerTwo")
    p2.style.opacity = "0.5";
    p2.style.backgroundColor = "black";
    document.querySelector(".cardsContainer").style.background = "orange";
    
    // reset self
    let p1 = document.querySelector(".playerOne");
    p1.style.opacity = "1";
    p1.style.backgroundColor = "orange";
}

const playerTwoTurn = () => {
    let p1 = document.querySelector(".playerOne")
    p1.style.opacity = "0.5";
    p1.style.backgroundColor = "black";
    document.querySelector(".cardsContainer").style.background = "green";

    // reset self
    let p2 = document.querySelector(".playerTwo");
    p2.style.opacity = "1";
    p2.style.backgroundColor = "green";
}

const rewardCurrentPlayerWithPoints = () => {
    if(currentPlayer === party[0]) player1Score+=100;
    else player2Score+=100;
}

const readyCurrentPlayerCards = () => {
    if(currentPlayer === party[0]) {
        playerOneTurn();
    }
    else playerTwoTurn();
}