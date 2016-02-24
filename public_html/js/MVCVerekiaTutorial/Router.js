"use strict";

/*you shouldn't need this for IE10 and higher;
 * just use HTML5 history management */

define(function(){
    
    //var routes = [{hash:'#list', controller:'ListController'},
    //              {hash:'#add',  controller:'AddController'}];
    //var defaultRoute = '#list';
    //var currentHash = '';
    
    function startRouting(){
        history.pushState(routes[0], null, "index.html");
    }
    /*
    function hashCheck(){
        if (window.location.hash !== currentHash){
            for (var i = 0, currentRoute; currentRoute = routes[i++];){
                if (window.location.hash === currentRoute.hash)
                    loadController(currentRoute.controller);
            }
            currentHash = window.location.hash;
        }
    }
    
    function loadController(controllerName){
        require(['Controllers/' + controllerName], function(controller){
            controller.start();
        });
    }
    */
    return {
        startRouting:startRouting
    };
});


