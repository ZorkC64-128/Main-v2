/*------------- ---------
  --- Stationary Harvester v.I.3---
 ----------------------- */
var roleSHarvester = {

/** @param {Creep} creep **/

    run: function (creep) {

        if(creep.memory.role == 'sharvesterA'){
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            var flag = (Game.flags['SC - A']);
            

            /*
            const look = creep.room.lookAt(flag);

            look.forEach(function(lookObject) {
                if(!lookObject.type == LOOK_STRUCTURES) {

                    console.log('There are no containers with energy!');
                }
                if(lookObject.type == LOOK_STRUCTURES) {


                    var flagpos = flag.pos.x +'x-' + flag.pos.y
                    var creepos = creep.pos.x + 'x-' + creep.pos.y

                    if(!creepos == flagpos){

                        console.log(creep.name+':'+ 'Im heading towards ' + flagpos);//    return
                    }
                    if(creepos == flagpos){
                        console.log(creep.name+':Im at position.'+ creepos)
                    }

                    }else{

                    //creep.moveTo(lookObject.creep);
                    //console.log(creep.name+':'+ 'moving towards '+lookObject.structure.structureType+ '.');
                    }
                //}
            });
            */

            if (creep.store < creep.store.getCapacity) {
                //Creep.say(
                if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                }

            } else {
                // Dump into storage container.
                if (creep.room.storage && (creep.room.storage.store < creep.room.storage.store.getCapacity)) {
                    for(const resourceType in creep.store) {
                        if (creep.transfer(creep.room.storage, resourceType) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(creep.room.storage, {reusePath: 5});
                        }
                        creep.say('⚡')
                    }
                } else {

                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                    //creep.moveTo(37, 31, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                }
            }
        }
        
        if(creep.memory.role == 'sharvesterB'){
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] >  0);
                }
            });
            
            var resource = creep.memory.flag;
            var flag = Game.flags[resource];
            //console.log('Harvester B online.')
            //var flag = (Game.flags['SC - C'].pos);
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);

            // Alert if there is a creep in the way.
           
            /*
            const look = creep.room.lookAtArea(flag);
            look.forEach(function(lookObject) {
                if(lookObject.type == LOOK_CREEPS) {
                    //creep.moveTo(lookObject.creep);
                    console.log('Creep in the way!')
                }
            });
            */

            if (creep.store < creep.store.getCapacity) {
                //Creep.say("⛏")
                if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                    console.log('SHarvester B is looking for energy to harvest.')
                }
            } else {
                // Dump into storage container.
                console.log('SHarvester B is transfering energy into storage')
                if (creep.room.storage && (creep.room.storage.store < creep.room.storage.store.getCapacity)) {
                    for(const resourceType in creep.store) {
                        if (creep.transfer(creep.room.storage, resourceType) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(flag, {reusePath: 5});
                        }
                    }
                } else {
                    console.log('SHarvester B in else statement.')
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                    //creep.moveTo(37, 31, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                }
            }

        }
        
        if(creep.memory.role == 'sharvesterC'){
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] >  0);
                }
            });
            
            var resource = creep.memory.flag;
            var flag = Game.flags[resource];
            //console.log('Harvester B online.')
            //var flag = (Game.flags['SC - C'].pos);
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);

            if (creep.store < creep.store.getCapacity) {
                //Creep.say("⛏")
                if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                    console.log('SHarvester C is looking for energy to harvest.')
                }
            } else {
                // Dump into storage container.
                    console.log('SHarvester C is transfering energy into storage')
                if (creep.room.storage && (creep.room.storage.store < creep.room.storage.store.getCapacity)) {
                    for(const resourceType in creep.store) {
                        if (creep.transfer(creep.room.storage, resourceType) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(flag, {reusePath: 5});
                        }
                    }
                } else {
                    console.log('SHarvester C in else statement.')
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                    //creep.moveTo(37, 31, {visualizePathStyle: {stroke: '#ffffff'}, reusePath: 5});
                }
            }
    
        }
    }
};

module.exports = roleSHarvester;