"use strict";

require(['Models/Facility', 'Controllers/AddController']
    , function(Facility, AddController){
    
        var facilities = [new Facility('Factory'),
                     new Facility('Regional Warehouse'),
                     new Facility('Wholesale Warehouse')];
        
        localStorage.facilities = JSON.stringify(facilities);   
        AddController.start(); 
});