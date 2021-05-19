
module.exports = {

    run : function(room){

    // Creep 'role' count.
        //This filter counts the roles from 'creeps' memory. This count helps govern population.
        var sharvestersA=_.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterA');
        var sharvestersB=_.filter(Game.creeps, (creep) => creep.memory.role == 'sharvesterB');
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

            console.log('------------');
            //Display squad count.Display report code. Uses creep role count.
            console.log('Defenders: ' + defenders.length);
            console.log('Stationary Harvesters: A:' + sharvestersA.length+'  B:' + sharvestersB.length);
            console.log('Harvesters: A:' + harvestersA.length+' B:'+harvestersB.length);
            console.log('Builders: ' + builders.length + '  Repairers: ' + repairers.length);
            console.log('Upgraders: ' + ' A:' + upgradersA.length+ ' B:' + upgradersB.length);
            console.log('------------');
            var controller=(Game.spawns['Hub'].room.controller.progress);
            console.log('Controller: ' +controller);

        // Counts containers in current room.
        var con = Game.spawns['Hub'].room.find(FIND_STRUCTURES,{
            filter: {structureType: STRUCTURE_CONTAINER}});
            // Reports the number of containers 'Hub' spawn room has.
            console.log('There are ' +con.length+ ' container(s).');




    var levelname = 'Ground Zero';

    var SH = 'stationary harvester'
    var UP = 'upgrader'
    var HV = 'harvester'
    var DF = 'defender'
    var RP = 'repairer'
    var EX = 'explorer'
    var BD = 'builder'




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
    if(defenders.length == 15){
        var level = 4;
    }

    //Checking if there is enough harvesters to not trigger an ERM response before applying level.
    if(harvestersA.length > 0){
        for(i=0;i<10;i++){
            if(i == 1){
                var role = DF 
                var sc = 'A'
                var pop = 5
                var type = 'DF'
            }
            if(i == 2){
                var role = RP
                var sc = 'A'
                var pop = 2
                var type = 'RP'
            }
            if(i == 3){
                var role = BD
                var sc = 'A'
                var pop = 2
                var type = 'BD'
            }
            if(i == 4){
                var role = UP
                var sc = 'A'
                var pop = 1
                var type = 'UP'
            }
            if(i == 5){
                var role = UP
                var sc = 'B'
                var pop = 1
                var type = 'UP'
            }
            if(i == 6){
                var role = HV
                var sc = 'A'
                var pop = 2
                var type = 'HV'
            }
            if(i == 7){
                var role = HV
                var sc = 'B'
                var pop = 2
                var type = 'HV'
            }
            if(i == 8){
                var role = SH
                var sc = 'A'
                var pop = 1
                var type = 'SH'
            }
            if(i == 9){
                var role = SH
                var sc = 'B'
                var pop = 1
                var type = 'SH'
        
                console.log('hello')
            }
        }

        //Ground Zero Operation.
        if(level == 1) {
                //Level 1 Spawn Prototypeing. === Emergency Level.

                var newName = type + '-' + sc +'L' + level + '-' + Game.time;
                console.log('Spawning new ' + role +': ' + newName);

                if(role == DF && DF <= pop) {
                //This is the complicated part.
                    Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,ATTACK,ATTACK,MOVE,MOVE,MOVE,MOVE], newName,
                        {memory: {role: 'defender'}});
                }
                if(role == RP && RP <= pop){
                    Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                        {memory: {role: 'repairer'}});    
                }
                if(role == BD && BD <= pop) {
                    Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                        {memory: {role: 'builder'}});
                }
                if(role == UP && sc == 'A' && UP <= pop ) {
                    Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                        {memory: {role: 'upgraderA', flag:'UP - A'}});
                }
                if(role ==UP && sc =='B' && UP <= pop) {
                    Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                        {memory: {role: 'upgraderB', flag:'UP - B'}});
                }
                if(role == HV && sc == 'A' && HV <= pop) {
                    Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
                        {memory: {role: 'harvesterA', flag:'ES - A'}});
                }
                if(role == HV && sc == 'B' && HV <= pop) {
                    Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE,MOVE], newName,
                        {memory: {role: 'harvesterB', flag:'ES - A'}});
                }
                if(role == SH && sc == 'A' && SH <= pop) {
                    Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                        {memory: {role: 'sharvesterA', flag:'SC - A'}});
                }
                if(role == SH && sc == 'B' <= pop) {
                    console.log('hello')
                    Game.spawns['Hub'].spawnCreep([WORK,WORK,MOVE,MOVE], newName,
                        {memory: {role: 'sharvesterB', flag:'SC - C'}});
                } else {
                    return
                }
            }        
        if(level == 2) {
                    //Level 1 Spawn Prototypeing. === Emergency Level.

                    var newName = role + '-' + sc +'L' + level + '-' + Game.time;
                    console.log('Spawning new ' + role +': ' + newName);

                    if(role == DF && DF <= pop) {
                    //This is the complicated part.
                        Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,ATTACK,MOVE,MOVE], newName,
                            {memory: {role: 'defender'}});
                    }
                    if(role == RP &&  RP <= pop){
                        Game.spawns['Hub'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                            {memory: {role: 'repairer'}});   
                    }
                    if(role == BD && BD <= pop) {
                        Game.spawns['Hub'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                            {memory: {role: 'builder'}});
                    }
                    if(role == UP && sc == 'A' && UP <= pop ) {
                        Game.spawns['Hub'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                            {memory: {role: 'builder'}});
                    }
                    if(role ==UP && sc =='B' &&  UP <= pop) {
                        Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                            {memory: {role: 'upgraderB', flag: 'UP - B'}});
                    }
                    if(role == HV && sc == 'A' &&  HV <= pop) {
                        Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                            {memory: {role: 'upgraderB', flag: 'UP - B'}});
                    }
                    if(role == HV && sc == 'B' && HV <= pop) {
                        Game.spawns['Hub'].spawnCreep([WORK,CARRY,CARRY,MOVE,MOVE], newName,
                            {memory: {role: 'harvesterB', flag:'ES - B'}});
                    }
                    if(role == SH && sc == 'A' && HV <= pop) {
                        Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                            {memory: {role: 'sharvesterA', flag:'SC - A'}});
                    }
                    if(role == SH && sc == 'B' && HV <= pop) {
                        Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
                            {memory: {role: 'sharvesterA', flag:'SC - A'}});
                    }
                } 
        if(level == 3) {
                        //Level 1 Spawn Prototypeing. === Emergency Level.

                        var newName = role + '-' + sc +'L' + level + '-' + Game.time;
                        console.log('Spawning new ' + role +': ' + newName);

                        if(role == DF && DF <= pop) {
                        //This is the complicated part.
                            Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,ATTACK,MOVE,MOVE,MOVE], newName,
                                {memory: {role: 'defender'}});
                        }
                        if(role == RP && RP <= pop){
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE,MOVE], newName,
                                {memory: {role: 'repairer'}});    
                        }
                        if(role == BD && BD <= pop){
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE,MOVE], newName,
                                {memory: {role: 'builder'}});
                        }
                        if(role == UP && sc == 'A' && UP <= pop) {
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,
                                {memory: {role: 'upgraderA', flag: 'UP - A'}});
                        }
                        if(role ==UP && sc =='B' && UP <= pop) {
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,
                                {memory: {role: 'upgraderB', flag: 'UP - B'}});
                        }
                        if(role == HV && sc == 'A' && HV <= pop) {
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,MOVE], newName,
                                {memory: {role: 'upgraderB', flag: 'UP - B'}});
                        }
                        if(role == HV && sc == 'B' && HV <= pop) {
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
                                {memory: {role: 'harvesterB', flag:'ES - B'}});
                        }
                        if(role == SH && sc == 'A' && SH <= pop) {
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,MOVE,MOVE], newName,
                                {memory: {role: 'sharvesterA', flag:'SC - A'}});
                        }
                        if(role == SH && sc == 'B' && SH <= pop) {
                            Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,MOVE,MOVE], newName,
                                {memory: {role: 'sharvesterA', flag:'SC - A'}});
                        }
                    }        
        if(level == 4) {
                            //Level 1 Spawn Prototypeing. === Emergency Level.

                            var newName = role + '-' + sc +'L' + level + '-' + Game.time;
                            console.log('Spawning new ' + role +': ' + newName);

                            if(role == DF && DF <= pop) {
                            //This is the complicated part.
                                Game.spawns['Hub'].spawnCreep([TOUGH,TOUGH,TOUGH,TOUGH,RANGED_ATTACK,RANGED_ATTACK,ATTACK,MOVE,MOVE], newName,
                                    {memory: {role: 'defender'}});
                            }
                            if(role == RP && RP <= pop){
                                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                                    {memory: {role: 'repairer'}}); 
                            }
                            if(role == BD && BD <= pop) {
                                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                                    {memory: {role: 'builder'}});
                            }
                            if(role == UP && sc == 'A' && UP <= pop) {
                                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,
                                    {memory: {role: 'upgraderA', flag: 'UP - A'}});
                            }
                            if(role ==UP && sc =='B' && UP <= pop) {
                                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,MOVE], newName,
                                    {memory: {role: 'upgraderB', flag: 'UP - B'}});
                            }
                            if(role == HV && sc == 'A' && HV <= pop) {
                                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
                                    {memory: {role: 'harvester', flag:'ES - A'}});
                            }
                            if(role == HV && sc == 'B' && HV <= pop) {
                                Game.spawns['Hub'].spawnCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], newName,
                                    {memory: {role: 'harvesterB', flag:'ES - B'}});
                            }
                            if(role == SH && sc == 'A' && SH <= pop) {
                                Game.spawns['Hub'].spawnCreep([WORK,WORK,WORK,WORK,MOVE,MOVE], newName,
                                    {memory: {role: 'sharvesterA', flag:'SC - A'}});
                            }
                            if(role == SH && sc == 'B' && SH <= pop) {
                                Game.spawns['Hub'].spawnCreep([WORK,MOVE,MOVE], newName,
                                    {memory: {role: 'sharvesterB', flag:'SC - C'}});
                            }
                        } 
    }
    //An 'Emergency Response Mode'. Makes sure harvesters are spawned 1st.
    if(harvestersA.length < 1) {
    var newName = '⚠ Harvester' + Game.time;

    console.log('⚠ Emergency Response Mode triggered. Spawning ' + newName+'.');

    Game.spawns['Hub'].spawnCreep([WORK,CARRY,MOVE], newName,
        {memory: {role: 'harvesterA', flag:'ES - A'}});
}
    }
}