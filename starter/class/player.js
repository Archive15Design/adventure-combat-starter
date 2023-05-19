const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    const item = this.currentRoom.getItemByName(itemName);
    this.items.push(item);
    let roomItems = this.currentRoom.items;
    roomItems.splice(roomItems.indexOf(item), 1);

    console.log(`You take ${item.name} from ${this.currentRoom.name}.`);
  }

  dropItem(itemName) {
    const item = this.getItemByName(itemName);
    let roomItems = this.currentRoom.items;
    roomItems.push(item);
    this.items.splice(this.items.indexOf(item), 1);

    console.log(`You drop ${item.name} in ${this.currentRoom.name}.`);

  }

  eatItem(itemName) {
    const item = this.items.find(item => item.name === itemName)
    if (!item.isFood){
      console.log(`You can only eat food...`);
      return;
    }

    const indexOfItem = this.items.indexOf(item);
    this.items.splice(indexOfItem, 1);

    console.log(`You eat a ${item.name}. Yummy!`);

  }

  getItemByName(name) {

    const item = this.items.find(item => item.name === name);
    return item;

  }

  hit(name) {
    const target = this.currentRoom.getEnemyByName(name);
    if (target){
      target.applyDamage(this.strength);
    } else {
      console.log("No valid target")
    }

  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
