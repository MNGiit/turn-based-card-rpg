let selected;
let playerHealth = 10;
let enemyHealth = 10;

let playerAttack = 3;
let enemyAttack = 110;

// start() starts combat round, player 1 goes first
// selectCard()
// selectTarget()
const selectTarget = (s) => {
    // selected = this; // seems to get the whole window
    // console.log(selected.event);
    selected = s;
    console.log("Target was selected.");
    // console.log("selected:", selected)



    // card effect
    // attack
    console.log("Attacking target");
    enemyHealth-=playerAttack;
    console.log("Player attacks enemy! Enemy health is now:", enemyHealth);

    // startNextTurn();
    checkHealth();

    // testing enemy turn
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

// checkHealth() on all. if all player health is gone, game over, player loses
// checkHealth() if all enemies health are gone, game over, player wins
// checkHealth() if both player and enemy has health, continue