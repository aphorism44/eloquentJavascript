"use strict";

define(['json!Data/data.json']
    , function(JsonData) {
    var DemandCardDeck = function(round) {
        var deck = [];
        console.log(JsonData.demandCards);
        
        //JsonData.demandCards.forEach(function(rnd) {
        //    deck.push(rnd);
        //});

      this.printWholeDeck = function() { console.log(deck); }
      , this.randomFunction = function() { return 3; }
  };
  
  return DemandCardDeck;
});