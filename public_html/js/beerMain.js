"use strict";


require(['Models/Game', 'json!Data/data.json']
    , function(Game, InitialData){
        
        var game = new Game(InitialData);
        game.printInformation();
        
});