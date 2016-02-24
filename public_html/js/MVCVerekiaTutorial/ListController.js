"use strict";

define(['Views/ListView'], function(ListView){
    
    function start(){
        var facilities = JSON.parse(localStorage.facilities);
        ListView.render({facilities:facilities});
    }
    
    return {
        start:start
    };
});