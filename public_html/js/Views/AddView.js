"use strict";

define(function(){
    
    function render(parameters){
        var appDiv = document.getElementById('app');
        appDiv.innerHTML = '<input id="facility-type" /><button id="add">Add this facility</button>';
    }
    
    return {
        render:render
    };
});