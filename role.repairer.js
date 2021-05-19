//------ Repairer v.I------//
var roleRepairer =
{
/** @param {Creep} creep **/
    run: function(creep) {
    //Get source from :
        var containers = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
                && (structure.store[RESOURCE_ENERGY] >  0);
            }
        });
        // Auto source switch.
        if(containers.length < 1){
            creep.memory.resource = 'esource';
        }
        if(containers.length > 0){
            creep.memory.resource = 'containers';
        }

        //Source override.
        //creep.memory.resource = 'containers';
        //creep.memory.resource ='esource';

        //Flags. Cannot be used unless the 'source' variable is changed to 'flag'.
        //creep.memory.flag = 'SC - A';
        //var subtarget = creep.memory.flag
        //var flag = (Game.flags[subtarget]);

        // Searches for containers that have energy. 
        if(creep.memory.repairing && creep.carry.energy == 0) {
          creep.memory.repairing = false;
          creep.say('⛏:R');
        }

            else if(!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
              creep.memory.repairing = false;
              creep.say('⛏:R');
            }

            else if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
              creep.memory.repairing = true;
              creep.say('🚧 repair');
            }
            
        //Attempting to repair an object.
        if(creep.memory.repairing){
            const targets = creep.room.find(FIND_STRUCTURES, {
            filter: object => object.hits < object.hitsMax
            });

        targets.sort((a,b) => a.hits - b.hits);

        if(targets.length > 0) {
            if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
                creep.say('🛠');
            }
        }
        }else{
        //If Harvesting
    	     //Selection of energy sources.
            if(creep.memory.resource=='esource'){
                 // Allows for the pickup of energy from energy sources.
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
                     creep.say('⛏:R');
                }
            }
            if(creep.memory.resource=='containers'){
                 // Allows for the pickup of energy from containers. 3of3.
                var source = creep.pos.findClosestByPath(containers);
                if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                     creep.moveTo(source);
                
                }
            }

        }
    }
};

module.exports = roleRepairer;
