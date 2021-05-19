var roleDefender = {

  run: function(creep){
    var enemy = creep.room.find(FIND_HOSTILE_CREEPS);
    var closestHostile = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var flag = (Game.flags['Aggression Zone'].pos);

    if(enemy.length < 1) {
    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});
    }

    else if (enemy.length > 0)  {
      if (creep.attack(closestHostile) === ERR_NOT_IN_RANGE) {
        creep.moveTo(closestHostile, {visualizePathStyle: {stroke: '#ffaa00'}});
        console.log('⚠ Hostiles Detected ⚠')
      }
    }
  }
};
module.exports = roleDefender;
