//------ SPAWNER v.I ------//
module.exports = {

    run : function(room){
    // Creep 'role' count.
        //This filter counts the roles from 'creeps' memory. This count helps govern population.
        var sharvestersA=_.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterA');
        var sharvestersB=_.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterB');
        var sharvestersC=_.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterC');
        var harvestersA=_.filter(Game.creeps, (creep) => creep.memory.role == 'harvesterA');
        var harvestersB=_.filter(Game.creeps,(creep)=> creep.memory.role == 'harvesterB');
        var builders=_.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
        var upgradersA=_.filter(Game.creeps, (creep) => creep.memory.role == 'upgraderA');
        var repairers=_.filter(Game.creeps,(creep) => creep.memory.role == 'repairer');
        var defenders=_.filter(Game.creeps,(creep) => creep.memory.role == 'defender');
        var upgradersB=_.filter(Game.creeps, (creep) => creep.memory.role == 'upgraderB');
        var extensions = Game.spawns.Hub.room.find(FIND_MY_STRUCTURES, {
            filter: { structureType: STRUCTURE_EXTENSION }
            });

            console.log('------Spawner v.I------');
            //Display squad count.Display report code. Uses creep role count.
            console.log('Defenders: ' + defenders.length);
            console.log('Stationary Harvesters: A:' + sharvestersA.length+'  B:' + sharvestersB.length+' C:'+sharvestersC.length);
            console.log('Harvesters: A:' + harvestersA.length+' B:'+harvestersB.length);
            console.log('Builders: ' + builders.length + '  Repairers: ' + repairers.length);
            console.log('Upgraders: ' + ' A:' + upgradersA.length+ ' B:' + upgradersB.length);
            console.log('------------');
            var controller=(Game.spawns['Hub'].room.controller.progress);
            var cap=(Game.spawns['Hub'].room.controller.progressTotal);
            var clevel=(Game.spawns['Hub'].room.controller.level);
            console.log('Controller: at L:'+clevel+' ' +controller+'/'+cap);

        // Counts containers in current room.
        var con = Game.spawns['Hub'].room.find(FIND_STRUCTURES,{
            filter: {structureType: STRUCTURE_CONTAINER}});
            // Reports the number of containers 'Hub' spawn room has.
            console.log('There are ' +con.length+ ' container(s).');

        // Determining level by counting defenders.
        if(defenders.length < 1){
            var level = 1;
        }
        if(defenders.length == 1){
            var level = 2;
        }
        if(defenders.length > 1 && defenders.length < 5){
            var level = 3;
        }
        if(defenders.length > 4){
        var level = 4;
    }
        // Level Override.
        //level = 1

        // Checking if there is enough harvesters to not trigger an ERM response before applying level.
        if(harvestersA.length > 0){
        //Ground Zero Operation.
        if(level == 1) {
            //Level 1 Spawn Prototypeing. === Emergency Level.
            var levelname = 'Ground Zero';

            if(defenders.length < 5 ) {
                var newName = 'D-L1-' + Game.time;
                console.log('Spawning new defender: ' + newName);
                Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'defender'}});
            }
            if(repairers.length < 1  && upgradersA ) {
                var newName = 'R-L1-' + Game.time;
                console.log('Spawning new repairer: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'repairer'}});
            }

            if(builders.length < 1 && repairers.length > 0) {
                var newName = 'B-L1-' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'builder'}});
            }

            if(upgradersA.length < 1 ) {
                var newName = 'U-AL1-' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderA', flag:'UP - A'}});
            }
            if(upgradersB.length < 1 && sharvestersA.length > 0) {
                var newName = 'U-BL1-' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderB', flag:'UP - B'}});
            }
            if(harvestersA.length < 2) {
                var newName = 'H-AL1-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                    {memory: {role: 'harvesterA', flag:'ES - A'}});
            }

            if(harvestersB.length < 2 && sharvestersA.length > 0
                || harvestersB.length < 2 && sharvestersB.length > 0
                || harvestersB.length < 2 && sharvestersC.length > 0) {
                var newName = 'H-BL1-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'harvesterB', flag:'SC - C'}});
            }

            if(sharvestersA.length < 1 && con.length > 0) {
                var newName = 'SH-AL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterA', flag:'SC - A'}});
            }
            if(sharvestersB.length < 1 && sharvestersA.length > 0) {
                var newName = 'SH-BL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterB', flag:'SC - B'}});
            }

            if(Game.spawns['Hub'].spawning) {
                var spawningCreep = Game.creeps[Game.spawns['Hub'].spawning.name];
                Game.spawns['Hub'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Hub'].pos.x + 1,
                    Game.spawns['Hub'].pos.y,
                    {align: 'left', opacity: 0.8});
            }
        }

        //Light Duty Operation.
        if(level == 2 ) {
        //Level 2 Spawn Prototypeing Light Duty.

            var levelname = 'Light Duty';

            if(defenders.length < 5 ) {
                var newName = 'D-L2-' + Game.time;
                console.log('Spawning new defender: ' + newName);
                Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,ATTACK,MOVE,MOVE], newName,
                    {memory: {role: 'defender'}});
            }
            if(repairers.length < 1 && upgradersA.length > 0 ) {
                var newName = 'R- L2-' + Game.time;
                console.log('Spawning new repairer: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'repairer'}});
            }

            if(builders.length < 1 && repairers.length > 0) {
                var newName = 'B-L2-' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'builder'}});
            }

            if(upgradersA.length < 1 ) {
                var newName = 'U-AL2-' + Game.time;
                console.log('Spawning new upgraderA: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderA', flag: 'UP - A'}});
            }
            if(upgradersB.length < 1  &&  sharvestersA.length > 0 ) {
                var newName = 'U-BL2-' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderB', flag: 'UP - B'}});
            }
            if(harvestersA.length < 2) {
                var newName = 'H-AL2-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'harvesterA', flag:'ES - A'}});
            }
            if(harvestersB.length < 2 && sharvestersA.length > 0
                || harvestersB.length < 2 && sharvestersB.length > 0
                || harvestersB.length < 2 && sharvestersC.length > 0) {
                var newName = 'H-BL2-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'harvesterB', flag:'SC - C'}});
            }

            if(sharvestersA.length < 1 && con.length > 0) {
                var newName = 'SH-AL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterA', flag:'SC - A'}});
            }
            if(sharvestersB.length < 1 && sharvestersA.length > 0) {
                var newName = 'SH-BL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterB', flag:'SC - B'}});
            }

            // Visual Display  of spawning status.
            if(Game.spawns['Hub'].spawning) {
                var spawningCreep = Game.creeps[Game.spawns['Hub'].spawning.name];
                Game.spawns['Hub'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Hub'].pos.x + 1,
                    Game.spawns['Hub'].pos.y,
                    {align: 'left', opacity: 0.8});
            }
        }

        //Optimal Operation.
        if(level == 3 && extensions.length > 4) {
        //Level 3 Spawn Prototypeing. Optimal Duty requires 5 extensions.
            var levelname = 'Optimal Duty';

            if(defenders.length < 5 ) {
                var newName = 'D-L3-' + Game.time;
                console.log('Spawning new defender: ' + newName);
                Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,ATTACK,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'defender'}});
            }
            if(repairers.length < 2 ) {
                var newName = 'R-L3-' + Game.time;
                console.log('Spawning new repairer: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'repairer'}});
            }

            if(builders.length < 1) {
                var newName = 'B-L3-' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'builder'}});
            }

            if(upgradersA.length < 1 ) {
                var newName = 'U-AL3-' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderA', flag: 'UP - A'}});
            }

            if(upgradersB.length < 1 && sharvestersA.length > 0) {
                var newName = 'U-BL3-' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderB', flag: 'UP - B'}});
            }
            if(harvestersA.length < 1) {
                var newName = 'H-AL3-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'harvesterA', flag:'ES - A'}});
            }
            if(harvestersB.length < 3 && sharvestersA.length > 0
                || harvestersB.length < 3 && sharvestersB.length > 0
                || harvestersB.length < 3 && sharvestersC.length > 0) {
                var newName = 'H-BL3-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                    {memory: {role: 'harvesterB', flag:'SC - C'}});
            }

            if(sharvestersA.length < 1 && con.length > 0) {
                var newName = 'SH-AL2-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterA', flag:'SC - A'}});
            }
            if(sharvestersB.length < 1 && sharvestersA.length > 0 ) {
                var newName = 'SH-BL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterB', flag:'SC - B'}});
            }
            if(sharvestersC.length < 1 && sharvestersB.length > 0) {
                var newName = 'SH-CL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterC', flag:'SC - C'}});
            }
            // Visual display of spawning status.
            if(Game.spawns['Hub'].spawning) {
                var spawningCreep = Game.creeps[Game.spawns['Hub'].spawning.name];
                Game.spawns['Hub'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Hub'].pos.x + 1,
                    Game.spawns['Hub'].pos.y,
                    {align: 'left', opacity: 0.8});
            }
        }

        //Advanced Operation.
        if(level == 4 && extensions.length > 9) {
        //Level 4 Spawn Prototypeing. Advanced operation requires 10 extentions.
            var levelname = 'Advanced Duty';

            if(defenders.length < 5 ) {
                var newName = 'D-L4-' + Game.time;
                console.log('Spawning new defender: ' + newName);
                Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'defender'}});
            }
            if(repairers.length < 1 ) {
                var newName = 'R-L4-' + Game.time;
                console.log('Spawning new repairer: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'repairer'}});
            }

            if(builders.length < 1) {
                var newName = 'B-L4-' + Game.time;
                console.log('Spawning new builder: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'builder'}});
            }

            if(upgradersA.length < 1 ) {
                var newName = 'U-AL4-' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderA', flag: 'UP - A'}});
            }

            if(upgradersB.length < 1 && sharvestersA.length > 0) {
                var newName = 'U-BL4-' + Game.time;
                console.log('Spawning new upgrader: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], newName,
                    {memory: {role: 'upgraderB', flag: 'UP - B'}});
            }
            if(harvestersA.length < 1) {
                var newName = 'H-AL4-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'harvester', flag:'ES - A'}});
            }
            if(harvestersB.length < 2 && sharvestersA.length > 0
                || harvestersB.length < 2 && sharvestersB.length > 0
                || harvestersB.length < 2 && sharvestersC.length > 0) {
                var newName = 'H-BL4-' + Game.time;
                console.log('Spawning new harvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                    {memory: {role: 'harvesterB', flag:'SC - C'}});
            }
            if(sharvestersA.length < 1 && con.length > 0) {
                var newName = 'SH-AL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterA', flag:'SC - A'}});
            }
            if(sharvestersB.length < 1 && sharvestersA.length > 0 ) {
                var newName = 'SH-BL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,MOVE,MOVE], newName,
                    {memory: {role: 'sharvesterB', flag:'SC - B'}});
            }
            if(sharvestersC.length < 1 && sharvestersB.length > 0) {
                var newName = 'SH-CL1-' + Game.time;
                console.log('Spawning new SHarvester: ' + newName);
                Game.spawns['Hub'].spawnCreep([WORK,MOVE,MOVE], newName,
                     {memory: {role: 'sharvesterC', flag:'SC - C'}});
            } 

            // Visual display of spawning status.
            if(Game.spawns['Hub'].spawning) {
                var spawningCreep = Game.creeps[Game.spawns['Hub'].spawning.name];
                Game.spawns['Hub'].room.visual.text(
                    '🛠️' + spawningCreep.memory.role,
                    Game.spawns['Hub'].pos.x + 1,
                    Game.spawns['Hub'].pos.y,
                    {align: 'left', opacity: 0.8});
            }
            Game.spawns['Hub'].room.createConstructionSite(Game.flags['C - A'], STRUCTURE_STORAGE);
        }
        console.log('Running '+levelname+' with '+extensions.length+' extensions.');
    }

        // An 'Emergency Response Mode'. Makes sure harvesters A are spawned 1st.
        if(harvestersA.length < 1) {
            var newName = '⚠ HarvesterA-' + Game.time;
            console.log('⚠ Emergency Response Mode triggered. Spawning ' + newName+'.');

            Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvesterA', flag:'ES - A'}});
        }

        // An 'Emergency Response Mode'. Makes sure harvesters B are spawned 1st.
        if(harvestersB.length < 1 && con.length > 1){
            var newName = '⚠ HarvesterB-' + Game.time;

            console.log('⚠ Emergency Response Mode triggered. Spawning ' + newName+'.');

            Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                {memory: {role: 'harvesterB', flag:'ES - A'}});
        }
    }
}
