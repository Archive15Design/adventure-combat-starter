class Character {

  constructor(name, description, currentRoom) {
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.strength = 10;
    this.health = 100;
    this.items = [];

  }

  applyDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} takes ${amount} damage!`);

    if (this.health <= 0){
      this.die();
    }
  }

  die() {
    for (const item of this.items){
      this.dropItem(item);
    }
    this.currentRoom = null;
    console.log(`${this.name} falls over dead!`);
  }

  dropItem(itemName){
    const item = this.items.find(item => item === itemName);
    this.currentRoom.items.push(item);
    this.items.splice(this.items.indexOf(item), 1);
  }

}

module.exports = {
  Character,
};
