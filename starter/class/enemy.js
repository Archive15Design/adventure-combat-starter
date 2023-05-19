const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
    this.justMoved = true;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    const possibleExits = this.currentRoom.getExits();
    const randomDirection = function(){
        let min = Math.ceil(0);
        let max = Math.floor(possibleExits.length - 1);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    let nextRoomKey = possibleExits[randomDirection()];
    let nextRoom = this.currentRoom.getRoomInDirection(nextRoomKey);
    this.currentRoom = nextRoom;
    this.cooldown = 3000;
    this.justMoved = true;
    this.act();
  }

  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    const cd = this.cooldown;
    const resetCooldown = function() {
      this.cooldown = 0;
      this.act();
    };

    const reset = resetCooldown.bind(this);

    setTimeout(reset, cd);
  }

  attack() {
    this.attackTarget.applyDamage(this.strength);
    this.cooldown = 3000;
    this.act();
  }

  applyDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} is hit for ${amount} damage!`);
    this.attackTarget = this.player;
  }



  act() {
    if (this.health <= 0) {
      this.die();
    } else if (this.cooldown > 0) {
      this.rest();
    } else if (this.attackTarget === this.player) {
      this.attack();
    } else if (this.justMoved === false){
      this.randomMove();
    } else {
      this.scratchNose();
      this.rest();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 2000;
    this.justMoved = false;
    this.alert(`${this.name} scratches its nose`);
  }


}

module.exports = {
  Enemy,
};
