let selected;

// start() starts combat round, player 1 goes first
// selectCard()
// selectTarget()
const selectTarget = (s) => {
    // selected = this; // seems to get the whole window
    // console.log(selected.event);
    selected = s;
    console.log("Target was selected.");
    console.log("selected:", selected)


    
    // card effect
    // checkHealth();


}

// checkHealth() on all. if all player health is gone, game over, player loses
// checkHealth() if all enemies health are gone, game over, player wins
// checkHealth() if both player and enemy has health, continue