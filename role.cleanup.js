var roleHarvester = require('role.harvester');

var roleLabourer = {
    run: function(creep){
        var dropenergy = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
        if(dropenergy != 0){
            if(creep.pickup(dropenergy) == ERR_NOT_IN_RANGE){
                creep.moveTo(dropenergy.pos)
            }
            
            if(creep.pickup(dropenergy) == ERR_FULL){
                roleHarvester.run(creep)
                /*
                var storages = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, { filter: { structureType: STRUCTURE_STORAGE }});
                for (i = 0; i < storages.length; i++) {
                    if(storages[i].store[RESOURCE_ENERGY] < storages[i].storeCapacity){
                        if(creep.transfer(storages[i],RESOURCE_ENERGY,creep.carry.energy) == ERR_NOT_IN_RANGE){
                            creep.moveTo(storages[i])
                */
                //        }
                //    }
                //}
            }
        }
        else{
            roleHarvester.run(creep)
        }
    }
}

module.exports = roleLabourer