

define([], function() {
    var Facility = function(type, inV, outV, stockCost, orderCost, budget) {
        //below are static after initialization
        var facilityType = type;
        var valueIncoming = inV;
        var valueOutgoing = outV;
        var stockHoldingCost = stockCost;
        var openOrderCosts = orderCost;
        //below change every turn
        var budget = budget;
        var stock = 0;
        var openOrders = 0;
        var outgoingGoods = 0;
        //below is set by player
        var nextTurnOrders= 0;
        
        this.getFacilityType = function() { return facilityType; }
        , this.getInformation = function() { 
            var facInfo = '{'
                + '"facilityType" : "' + facilityType + '"'
                + ', "budget" : ' + budget
                + ', "stock" : ' + stock
                + ', "openOrders" : ' + openOrders
                + ', "outgoingGoods" : ' + outgoingGoods
                + ', "nextTurnOrders" : ' + nextTurnOrders
                + '}';
             return facInfo; }
        , this.isBankrupt = function() { return budget >= 0; }
        , this.getOrders = function() { nextTurnOrders = 
                    prompt('What are your orders for next turn?'); }
        , this.calculateTurn = function(incomingGoods, incomingOrders) {
            stock += incomingGoods;
            budget -= incomingGoods * valueIncoming;
            
            if (incomingOrders + openOrders <= stock) {
                outgoingGoods = incomingOrders + openOrders;
                stock -= incomingOrders + openOrders;
                budget += (incomingOrders + openOrders) *  valueOutgoing;
                openOrders = 0;
            } else {
                budget += stock * valueOutgoing;
                outgoingGoods = stock;
                openOrders += incomingOrders - stock;
                stock = 0;
            }
            
            budget -= (openOrders * openOrderCosts) + (stock * stockHoldingCost);
            
            
        }
        
        
    };
    
    return Facility;
    
});