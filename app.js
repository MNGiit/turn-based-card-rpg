let selected;
let playerHealth = 100;
let enemyHealth = 10;

let playerAttack = 10;
let enemyAttack = 1;

class Fighter {
    constructor(health = 3) {
        this.health = health;
    }
    isAlive() {
        if(this.health > 0) return true;
        else return false;
    }
}

let enemies = [];
let enemiesCard = document.querySelectorAll(".enemy");
console.log(enemiesCard);
enemiesCard.forEach(function(card, i){
    let enemy = new Fighter();
    enemy.card = enemiesCard[i];
    console.log(enemy);
    enemies.push(enemy);
})


// start() starts combat round, player 1 goes first
// selectCard()
// selectTarget()
const selectTarget = (s) => {
    // selected = this; // seems to get the whole window
    // console.log(selected.event);
    selected = s; // need some way to correctly get enemy
    // console.log("Target was selected.", s);
    // console.log("selected:", selected)
    enemiesCard.forEach(function(card, i){
        if(s === enemies[i].card) {
            selected = enemies[i];
            console.log("Found selected:", selected);
        }
    })



    // card effect
    // attack
    // console.log("Attacking target");
    // enemyHealth-=playerAttack;
    // console.log("Player attacks enemy! Enemy health is now:", enemyHealth);
    console.log("Attacking target");
    s.health-=playerAttack;
    console.log("Player attacks enemy! Enemy health is now:", s.health);
    // need some way to correctly damage enemy

    // startNextTurn();
    checkHealth();

    // testing enemy turn
    checkEnemies();
    if(enemyHealth > 0 && playerHealth > 0) {
        playerHealth-=enemyAttack;
        console.log("Enemy attacks player! Player health is now:", playerHealth);
        checkHealth();
    } 


}

const checkHealth = () => {
    if(playerHealth <= 0) {console.log("Player loses! Game over.");}
    else if(enemyHealth <= 0) {console.log("Enemy loses! Congrats player, you won the battle!");}
    else if(enemyHealth > 0 && playerHealth > 0) {console.log("Both player and enemy can still fight!");}
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



// checkHealth() on all. if all player health is gone, game over, player loses
// checkHealth() if all enemies health are gone, game over, player wins
// checkHealth() if both player and enemy has health, continue