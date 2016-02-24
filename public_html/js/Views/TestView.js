"use strict";

define(function(){
    
    function render(parameters){
        var appDiv = document.getElementById('app');
        //HTML in JS file not ideal solution; use templating
        appDiv.innerHTML = '<input id="facility-type" /><button id="add">Add this facility</button>';
    }
    
    return {
        render:render
    };
});