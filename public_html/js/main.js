"use strict";

require(['Models/Facility', 'Router']
    , function(Facility, Router){
    
        var facilities = [new Facility('Factory'),
                     new Facility('Regional Warehouse'),
                     new Facility('Wholesale Warehouse')];

        localStorage.facilities = JSON.stringify(facilities);

        Router.startRouting();   
});