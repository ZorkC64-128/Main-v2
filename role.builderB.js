/*------------- ---------
  --- Builder v.I ---
 ----------------------- */
  var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
    //Harvest energy from:
        //var target = 'containers';
        //var target = 'esource'//-> Resource override switch.
        var target = creep.memory.resource

        // Sets the flag for Builder to gather energy from.
        var subTarget = creep.memory.flag;
        var flag = (Game.flags[subTarget]);

        // Searches for containers that have energy.
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] >  0);
            }
        });

        // Automatic source swtich logic that depends on containers.
        if(containers.length<1){
            creep.memory.resource = 'esource'
            creep.memory.flag = 'ES - B'
        }
        if(containers.length>0){
            creep.memory.resource = 'containers'
            creep.memory.flag = 'UP - A'
        }

        //Attempt to harvest energy if cargo is empty.
	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('⛏:B');
	    }

        //Attempt to build if  not already building and cargo is full.
  	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
  	        creep.memory.building = true;
  	        creep.say('🚧 build');
  	    }

        //Finding things to build.
  	    if(creep.memory.building) {
            var targetB = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER);
                }
            });
            var targetC = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER);
                }
            });
            var targetD = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_ROAD);
                }
            });
            var targetA = creep.room.find(FIND_CONSTRUCTION_SITES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL);
                }
            });
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);

                if(targetA.length > 0 ){
                    var targets = targetA
                    console.log(creep.name+':constructiion site wall.')
                }
                if(targetB.length > 0 ){
                    var targets = targetB;
                    console.log(creep.name+':constructiion site container.')
                }

                if(targetC.length > 0 && targetA.length < 1 && targetB.length < 1 ){
                    var targets = targetC
                    console.log(creep.name+':constructiion site tower.')
                }
                if(targetD.length > 0 && targetA.length < 1 && targetB.length < 1 && targetC.length < 1 ){
                    var targets = targetD
                    console.log(creep.name+':constructiion site road.')
                }
                //else if(targets.length == 0){
                 //  return;
                // }

                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    creep.say('🚧')
                    console.log(creep.name+':'+targets[0]);
                }

  	    }
	    else {
	    //Selection of energy sources.
	        if(target == 'esource'){
	            // Allows for the pickup of energy from energy sources.
	            var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                    creep.say('⛏:B');
                }
	        }
            if(target == 'containers'){
                // Allows for the pickup of energy from containers. 3of3.
                var source = creep.pos.findClosestByPath(containers);
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	}
};

module.exports = roleBuilder;