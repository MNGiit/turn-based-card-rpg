let selectedTarget;

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
    }
    isAlive() {
        if(this.health > 0) return true;
        else return false;
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