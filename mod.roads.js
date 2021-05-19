/*------------- ---------
--- Contruction Module  ---
 ----------------------- */
module.exports = {

   run : function(room){
       
       //Creates construction sites for containers at flag positions.
        Game.spawns['Hub'].room.createConstructionSite(Game.flags['SC - A'], STRUCTURE_CONTAINER);
        Game.spawns['Hub'].room.createConstructionSite(Game.flags['SC - B'], STRUCTURE_CONTAINER);
        Game.spawns['Hub'].room.createConstructionSite(Game.flags['SC - C'], STRUCTURE_CONTAINER);
        
    
        //Creates construction sites for building walls.
        for(i=0;i<3;i++){
            let x = 44 ;
            let y = 29 + i;
            
            Game.spawns['Hub'].room.createConstructionSite(x,y, STRUCTURE_WALL);
        }
       
       //console.log('Road contruction is online.');
       // creates roads.
        for(i=0;i<17;i++){
           let x = 21 ;
           let y = 25 + i;
           room.createConstructionSite(x,y, STRUCTURE_ROAD);
        }

       //creates more roads.
        for(i=0;i<11;i++){
           let x = 22;
           let y = 31 + i;
           room.createConstructionSite(x,y, STRUCTURE_ROAD);
        }
        for(i=0;i<6;i++){
           let x = 38 + i;
           let y = 29;
           room.createConstructionSite(x,y, STRUCTURE_ROAD);
        }
        for(i=0;i<6;i++){
           let x = 38 + i;
           let y = 31;
           room.createConstructionSite(x,y, STRUCTURE_ROAD);
        }
        for(i=0;i<8;i++){
            let x = 28 + i;
            let y = 25
            room.createConstructionSite(x,y, STRUCTURE_ROAD);
        }
        for(i=0;i<8;i++){
            let x = 16 + i;
            let y = 21 ;
            room.createConstructionSite(x,y, STRUCTURE_ROAD);
        }
   }
   
}
