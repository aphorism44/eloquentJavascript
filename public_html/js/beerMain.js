"use strict";


require(['Models/Facility', 'json!Data/data.json']
    , function(Facility, InitialData){
        var facilities = [];
        InitialData.facilityData.forEach(function(obj) {
            facilities.push(new Facility(obj.type, obj.valueIncoming
                , obj.valueOutgoing, obj.stockHoldingCost
                , obj.openOrderCosts, obj.budget))
        });
        
        localStorage.facilities = JSON.stringify(facilities);   
        facilities.forEach(function(f) { console.log(f.getValueOutgoing()); });
});