

define([], function() {
    
    var Facility = function(type, inV, outV, stockCost, orderCost, budget) {
        var facilityType = type;
        var valueIncoming = inV;
        var valueOutgoing = outV;
        var stockHoldingCost = stockCost;
        var openOrderCosts = orderCost;
        var budget = budget;
        
        var stock = 0;
        var openOrders = 0;
        var outgoingGoods = 0;
        
        this.getFacilityType = function() { return facilityType; }
        , this.getValueIncoming = function() { return valueIncoming; }
        , this.getValueOutgoing = function() { return valueOutgoing; }
        , this.getStockHoldingCost = function() { return stockHoldingCost; }
        , this.getOpenOrderCosts = function() { return openOrderCosts; }
        , this.getBudget = function() { return budget; }
        , this.getStock = function() { return stock; }
        , this.getOpenOrders = function() { return openOrders; }
        , this.calculateTurn = function(incomingGoods, incomingOrders) {
            stock += incomingGoods;
            budget -= incomingOrders * valueIncoming;
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
            
        }
        
        
    };
    
    return Facility;
    
});