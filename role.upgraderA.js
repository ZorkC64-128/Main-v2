/*------------- ---------
  --- Upgrader v.I.2 ---
 ----------------------- */
var roleUpgrader = {

    /** @param {Creep} creep **/

    run: function(creep) {


        if(creep.memory.role == 'upgraderA'){
        // Harvest energy from:
            var subTarget = creep.memory.flag;
            var flag = (Game.flags[subTarget]);

            // Searches for containers that have energy.
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] >  0);
                }
            });
            // Set harvesting memory to proper source.
            if(containers.length<1){
                creep.memory.resource = 'esource'
                creep.memory.flag = 'ES - B'
            }
            if(containers.length>0){
                creep.memory.resource = 'containers'
                creep.memory.flag = 'UP - A'
            }

            // Reads from memory harvesting source.
            var target = creep.memory.resource
            //console.log('upgrader reports '+target) //-> test switch value.

            // sets creep's memory to harvesting mode.
            if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
                creep.say('⛏:UA');
            }
            // sets creep's memory to upgrading mode.
            if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
    	        creep.memory.upgrading = true;
    	        creep.say('⤴');
            }

            // Move towards controller so that it can be upgraded.
    	    if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});

                }
            }
    	    else {
    	       //Selection of energy sources.
    	        if(target == 'esource'){
    	            // Allows for the pickup of energy from energy sources.
                    var sources = creep.pos.findClosestByPath(FIND_SOURCES);
                    if(creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});
                    }
    	        }
                if(target == 'containers'){
                    // Allows for the pickup of energy from containers. 3of3.
                    var source = creep.pos.findClosestByPath(containers);
                    if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(flag);
                    }
                }
            }
        }

        if(creep.memory.role == 'upgraderB'){

            // Counts containers in current room.
            var con = Game.spawns['Hub'].room.find(FIND_STRUCTURES,{
             filter: {structureType: STRUCTURE_CONTAINER}});
                //Switch between energy sources using container count.
                if(con.length<1){
                    creep.memory.resource = 'esource'
                    creep.memory.flag = 'ES - B'
                }
                if(con.length>0){
                    creep.memory.resource = 'containers'
                    creep.memory.flag = 'UP - B'
                }
            var target = creep.memory.resource //Dictates where to harvest from.
            var target = 'esource' //--->Manual override for the auto-Target.
            var subTarget = creep.memory.flag; // Pull flag from memory.
            var flag = (Game.flags[subTarget]); // Convert flag to a destination.

            // Searches for containers that have energy.
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
            return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] >  0);
                }
            });

            //sets upgrading to false.
            if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
                creep.memory.upgrading = false;
                creep.say('⛏:UB');
    	    }

            //sets upgrading to true.
      	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
      	        creep.memory.upgrading = true;
      	        creep.say('⤴');
      	    }

            // Upgrade Controller
      	    if(creep.memory.upgrading) {
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});

                }
            }
            else {
            // Selection of energy sources.
                if(target == 'esource'){
                  // Allows for the pickup of energy from energy sources.
                    var sources = creep.pos.findClosestByPath(FIND_SOURCES);

                    if(creep.harvest(sources,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}})
                    }
                }

                if(target == 'containers'){
                  //Allows for the pickup of energy from containers. 3of3.
                    var source = creep.pos.findClosestByPath(containers);

                    //creep.moveTo(flag);
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});

                    if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffaa00'}});

                    }
                }
            }
        }
    }
};

module.exports = roleUpgrader;
