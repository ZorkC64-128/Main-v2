/*------------- ---------
  --- Harvester v.I.2 ---
 ----------------------- */
var roleHarvester = {

    /** @param {Creep} creep **/

    run: function (creep) {
        if(creep.memory.role == 'harvesterA'){
            var subtarget = creep.memory.flag;
            var flag = (Game.flags[subtarget]);
            var filler = _.filter(Game.creeps, (creep) => creep.memory.role === 'filler');
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);

            // If harvesters energy is less than capactity then search for a raw energy source and harvest it.
            if (creep.store.getUsedCapacity([RESOURCE_ENERGY]) < creep.store.getCapacity([RESOURCE_ENERGY])) {
                creep.say("⛏:HA")
                if (creep.harvest(sources) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            else {
                // Search for structures that need energy.
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK || structure.structureType === STRUCTURE_SPAWN
                            || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_TOWER)
                            && structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]);
                        }
                });
                // Search for towers that need energy.
                var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType === STRUCTURE_TOWER;
                        }
                });
                // Search for enemy creeps.
                var enemy = creep.room.find(FIND_HOSTILE_CREEPS);
                // Not sure what filler code does.
                creep.say('⚡')

                // Store energy in tower if enemy is detected.
                if (tower != null && enemy.length > 0) {
                    // Harvester is looking for any towers that need energy.
                    if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
                        console.log('Harvester targeting towers.');
                    }

                } else if (creep.room.storage && _.sum(creep.room.storage.store) < creep.room.storage.storeCapacity && !target) {
                    //Harvester is looking for storages that need energy.
                    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        console.log('Harvester tagerting storage.');
                    }

                } else if (target) {
                    //Harvester is looking for any structures that need energy.
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                } else {
                    //Ominious Else loop.
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
                    console.log('Harvester in else loop.');
                }
            }
        }
    //------------------------------------------
        if(creep.memory.role == 'harvesterB'){
            //creep.memory.flag = 'SC - C'
            var resource = creep.memory.flag;
            var flag = Game.flags[resource];

            // Searches for containers that have energy.
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                  return (structure.structureType == STRUCTURE_CONTAINER)
                    && (structure.store[RESOURCE_ENERGY] >  0);
                }
            });

            // Looks for creeps that are in the way of flag.
            const look = creep.room.lookAt(flag);
            look.forEach(function(lookObject) {
                if(lookObject.type == LOOK_STRUCTURES) {
                    //if(creep.name == lookObject.creep.name){
                    //    return
                    //}
                    if(creep.moveTo(lookObject.creep) ==ERR_NO_PATH){
                    console.log('Creep '+lookObject.structure.structureType+' in the way!');
                    }
                }
            });

            // Find clostest path to container with energy.
            var sources = creep.pos.findClosestByPath(containers)

            creep.moveTo(sources, {visualizePathStyle: {stroke: '#ffffff'}});

            // If creep cannot withdrawl energy from container then move towards container.
            if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                 creep.moveTo(sources);
            }

            // Checks to see if carry capcity is full, if not harvest.
            if (creep.store.getUsedCapacity([RESOURCE_ENERGY]) < creep.store.getCapacity([RESOURCE_ENERGY])) {
                creep.say("🌀")
                //Move toward energy source and harvest.
                creep.moveTo(sources);

                //If there are containers that have energy.
                if(containers.length > 0){
                    if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources);
                        creep.memory.resource = 'containers'
                    }
                }
                //If no containers then harvest from an energy source.
                if(containers.length < 1){
                    sources = creep.pos.findClosestByRange(FIND_SOURCES);
                    if(creep.harvest(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources);
                        creep.memory.resource = 'esource'
                    }
                }
            }
            else {
                // Find a place to dump energy.
                var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_LINK
                            || structure.structureType === STRUCTURE_SPAWN
                            || structure.structureType === STRUCTURE_EXTENSION
                            || structure.structureType === STRUCTURE_TOWER)
                            && structure.store.getUsedCapacity([RESOURCE_ENERGY]) < structure.store.getCapacity([RESOURCE_ENERGY]);
                    }
                });
                creep.say('⚡')
                // Locate a tower.
                var tower = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return structure.structureType === STRUCTURE_TOWER;
                        }
                });

                // Check if there are hostile creeps.
                var enemy = creep.room.find(FIND_HOSTILE_CREEPS);

                // Count the number of defenders for tower refill code.
                var defenders=_.filter(Game.creeps,(creep) => creep.memory.role == 'defender');
                var harvestersB=_.filter(Game.creeps,(creep)=> creep.memory.role == 'harvesterB');
                var roomEnergyAvailable =Game.spawns.Hub.room.energyAvailable;

                // Unload energy into tower if there are hostile creeps.
                if (tower != null && enemy.length > 0  || tower != null && defenders.length > 4 && roomEnergyAvailable > 700) {
                    if (creep.transfer(tower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(tower, {visualizePathStyle: {stroke: '#ffffff'}});
                        console.log('Harvester B is transfering energy to tower.')
                    }

                // Unload energy into storage.
                } else if (creep.room.storage && _.sum(creep.room.storage.store) < creep.room.storage.storeCapacity && !target) {
                    if (creep.transfer(creep.room.storage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(creep.room.storage, {visualizePathStyle: {stroke: '#ffffff'}});
                        console.log('Harvester B is unloading energy into storage.')
                    }

                // Look for another place that needs energy.
                } else if (target) {
                    if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                        //console.log('Harvester B is looking for another place that needs energy.')
                    }
                } else {
                    console.log('Harvester B in else loop.');
                    creep.moveTo(flag, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
    }
};

module.exports = roleHarvester;
