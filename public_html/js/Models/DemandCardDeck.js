"use strict";

define(['json!Data/data.json']
    , function(JsonData) {
    var DemandCardDeck = function() {
        var deck = {};
        
        for (var round in JsonData.demandCards) {
            deck[round] = JsonData.demandCards[round];
        }
        

      this.printWholeDeck = function() { console.log(deck); }
      , this.randomFunction = function() { return 3; }
  };
  
  return DemandCardDeck;
});