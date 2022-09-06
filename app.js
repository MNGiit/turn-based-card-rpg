let selectedTarget;

let playerHealth = 100;
let enemyHealth = 10;

let playerAttack = 10;
let enemyAttack = 1;

class Fighter {
    constructor(health = 3, attack = 1) {
        this.health = health;
        this.attack = attack;
    }
    isAlive() {
        if(this.health > 0) return true;
        else return false;
    }
}

let player = new Fighter(playerHealth, playerAttack);
let enemies = [];
let enemiesCard = document.querySelectorAll(".enemy");

enemiesCard.forEach(function(card, i){
    let enemy = new Fighter();
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
            console.log("Attacking target");
            console.log("Target health is:", selectedTarget.health);
            selectedTarget.health-=playerAttack;
            console.log("Player attacks enemy! Enemy health is now:", selectedTarget.health);
        }
        else console.log("Enemies are defeated. Fighting should stop.");
    }

    // check health of all fighters, and if enemy is alive, attack player
    if(player.isAlive()) {
        if(enemiesCanContinueFight()) {
            enemies.forEach(function(enemy) {
                if(enemy.isAlive()) {
                    console.log("Enemy attacks player!");
                    player.health-=enemy.attack;
                    console.log("Player health:", player.health);
                }
            })
        }
        else console.log("There are no more enemies to fight. Combat should stop.");
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
        console.log("There are still enemies. Combat should continue.")
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