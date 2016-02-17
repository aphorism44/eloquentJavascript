define(function(){
    
    function render(parameters){
        var appDiv = document.getElementById('app');

        var facilities = parameters.facilities;
        
        var html = '<ul>';
        for (var i = 0, len = facilities.length; i < len; i++){
            html += '<li>' + facilities[i].type + '</li>';
        }
        html += '</ul>';
        
        appDiv.innerHTML = html;
    }

    return {
        render:render
    };
});