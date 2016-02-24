"use strict";

define(['Models/Facility', 'Models/DemandCardDeck'], function(Facility, DemandCardDeck) {
    var Game = function(jsonInitialData) {
        var facilities = [];

        jsonInitialData.facilityData.forEach(function(obj) {
            facilities.push(new Facility(obj.type, obj.valueIncoming
                , obj.valueOutgoing, obj.stockHoldingCost
                , obj.openOrderCosts, obj.budget))
            });
      localStorage.facilities = JSON.stringify(facilities);  

      this.printInformation = function() { 
          facilities.forEach(function(f) {
            console.log(f.getInformation()); 
        });
      }
      , this.randomFunction = function() { return 3; }
  };
  
  return Game;
});