"use strict";

define(['Views/AddView', 'Models/Facility'], function(AddView, Facility){

   function start(){
        AddView.render();
        bindEvents();       
    }
    
    function bindEvents(){
        document.getElementById('add').addEventListener('click', function(){
            var facilities = JSON.parse(localStorage.facilities);
            var facilityType = document.getElementById('facility-type').value;
            facilities.push(new Facility(facilityType));
            localStorage.facilities = JSON.stringify(facilities);
            window.location.hash = '#list';
        }, false);
    }

    return {
        start:start
    };
});