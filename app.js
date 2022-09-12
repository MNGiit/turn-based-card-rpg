let selectedTarget;
let selectedActionCard;

let playerName = "Player 1"
let playerHealth = 100;
let enemyHealth = 10;

let playerAttack = 10;
let enemyAttack = 1;

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
    createCards(n = 4) {
        for(let i = 0; i < n; i++) {
            this.createAttackCard();
        }
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
let party = []; // player 1 is team a
party.push(player);
player.createCards();



let enemies = [];
let enemiesCard = document.querySelectorAll(".enemy");

enemiesCard.forEach(function(card, i){
    let enemy = new Fighter("Enemy " + (i + 1).toString()); // .toString to get rid of the 0 in Fighter 01
    enemy.card = enemiesCard[i];
    enemies.push(enemy);
})

const selectTarget = (s) => {
    // selected = this; // seems to get the whole window
    // console.log(selected.event);
    if(!selectedActionCard) {
        console.log("Don't do anything.");
        return;
    }
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

    if(player.isAlive()) {
        if(enemiesCanContinueFight()) {
            // console.log("Attacking target");
            // console.log("Target health is:", selectedTarget.health);
            selectedTarget.health-=playerAttack;
            // console.log("Player attacks enemy! Enemy health is now:", selectedTarget.health);
            let text = document.createElement("p");
            text.innerHTML = "Player attacks enemy! Enemy health is now: " + selectedTarget.health;
            document.querySelector(".messageLogContainer").appendChild(text).scrollIntoView();
        }
        else console.log("Enemies are defeated. Fighting should stop.");
    }

    let cards = document.querySelectorAll(".card");
    cards.forEach(function(c){
        c.remove();
    })

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
            console.log(cards[i]);
            cards[i].style.backgroundColor = "gray";
        }
    }
}

showCards(player.cards);