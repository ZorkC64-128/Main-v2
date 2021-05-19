var roleExplorer = {
  run: function(creep) {

// (Game.flags[' SC - B'])
// (Game.flags[' SC - C'])


 let destination = (Game.flags['SC - C'])
 let target = destination



creep.moveTo(target)
creep.say('I love you')
    
  }
};
module.exports = roleExplorer;