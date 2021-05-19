/*------------- ---------
--- Casting Roles  ---
 ----------------------- */
//when adding a new roles be sure append the 'Execute Roles' section.

//--Creeps
var roleSHarvester = require('role.sharvester');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleBuilder = require('role.builder');
var roleDefender = require('role.defender');
var roleHealer = require('role.healer');
//var roleExplorer = require('role.explorer');

//--Structures
var structureTower = require('role.tower');

module.exports.loop = function () {

// Clear Memory Loop - prevents memory overflow. Is this working?
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }


/*------------- ---------
--- Auto Spawn Controls ---
 ----------------------- */



    // Declare Contruction sites for roads.
    var modRoads = require('mod.roads');

    var roomEnergyCapacity=Game.spawns.Hub.room.energyCapacityAvailable;
    var roomEnergyAvailable =Game.spawns.Hub.room.energyAvailable;
        console.log(" Energy: "+roomEnergyAvailable+" out of "+roomEnergyCapacity+" Max");


    var mode = 2;

    if (mode == 2){
        //This mode should run automatically.
        var modSpawner = require('mod.spawner');

    }

/*----------------------
  --- Execute Roles ---
 ----------------------- */

    for(let rooms in Game.rooms) {
        var room = Game.rooms[rooms];
        //modRoads.run(room);
        modSpawner.run(room);
        structureTower.run(room);
        //structureLink.run(room);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];

        if(creep.memory.role == 'harvesterA'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'harvesterB'){
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'sharvesterA'){
            roleSHarvester.run(creep);
        }
        if(creep.memory.role == 'sharvesterB'){
            roleSHarvester.run(creep);
        }
        if(creep.memory.role == 'sharvesterC'){
            roleSHarvester.run(creep);
        }
        if(creep.memory.role == 'upgraderA'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'upgraderB'){
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder'){
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer'){
            roleRepairer.run(creep);
        }
        if(creep.memory.role == 'explorer'){
            roleExplorer.run(creep);
        }
        if(creep.memory.role == 'defender'){
            roleDefender.run(creep);
        }
        if(creep.memory.role == 'healer'){
            roleHealer.run(creep);
        }
    }
}

/*
These are quick templates.

Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], H1,
    {memory: {role: 'harvester'}});
*/
