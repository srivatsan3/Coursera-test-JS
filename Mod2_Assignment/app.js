(function(){
	'use strict';

	angular.module('ShoppingListCheckOff',[])
	.controller('ToBuyController',ToBuyController)
	.controller('AlreadyBoughtController',AlreadyBoughtController)
	.service('ShoppingListCheckOffService',ShoppingListCheckOffService)

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService){
		var lefttoBuy = this;
		lefttoBuy.items = ShoppingListCheckOffService.getlefttoBuyItems();
		lefttoBuy.buy = function(index){
			ShoppingListCheckOffService.buyItem(index);
		};
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService){
		var itembought = this;
		itembought.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService(){
		var service=this;
		var toBuyItems = [
		{name: "Cookies", quantity: 6},
		{name: "Chocolate", quantity: 5},
		{name: "Chips", quantity: 4},
		{name: "Fruits", quantity: 7},
		{name: "Vegetables", quantity: 8},
		{name: "Soft Drinks", quantity: 3}];

		var boughtItems = [];

		service.buyItem = function(index){
			boughtItems.push(toBuyItems[index]);
			toBuyItems.splice(index,1);
		};

		service.getlefttoBuyItems = function(){
			return toBuyItems;
		};

		service.getBoughtItems = function(){
			return boughtItems;
		};
	}
})();