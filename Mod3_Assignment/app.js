(function () {
	'use strict'

	angular.module('NarrowItDownApp',[])
	.controller('NarrowItDownController',NarrowItDownController)
	.service('MenuSearchService',MenuSearchService)
	.directive('foundItems', FoundItemsDirective)
	.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");


	NarrowItDownController.$inject = ['MenuSearchService'];

	function NarrowItDownController(MenuSearchService){

		var narrow = this;
		narrow.found = MenuSearchService.getItems();
		narrow.searchMenuItems = function(){
			if(narrow.searchTerm === ""){
				MenuSearchService.clear();
			}
			else{
				MenuSearchService.getMatchedMenuItems(narrow.searchTerm)
				.then(function(result){
					narrow.found = result;
				});
			}
		}

		narrow.removeItem = function(itemindex){
			MenuSearchService.removeItem(itemindex);
		};
	}


	function FoundItemsDirective(){
		var ddo ={
			templateUrl : 'foundItems.html',
			scope : {
				items: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'found',
			bindToController: true
			};
			return ddo;
		}


	function FoundItemsDirectiveController(){
		var found = this;
		found.NtgFound = function(){
			if(found.items.length === 0){
				return true;
			}
			else{
				return false;
			}
		};
	}


	MenuSearchService.$inject = ['$http','ApiBasePath'];
	function MenuSearchService($http,ApiBasePath){
		var searchservice = this;
		var foundItems = [];

		searchservice.getMatchedMenuItems = function(searchTerm) {
			foundItems.splice(0,foundItems.length);
			if(searchTerm === ""){
				return foundItems;
			}

			else{

				return $http({
					method: "GET",
					url: (ApiBasePath+"/menu_items.json")
				}).then(function(result){
					var allItems = result.data.menu_items;
					foundItems.splice(0,foundItems.length);
					for(var i=0;i<allItems.length;i++){
						if(allItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
							foundItems.push(allItems[i]);
						}
					}
					return foundItems;
				});
			}
		};

		searchservice.clear = function(){
			foundItems.splice(0,foundItems.length);
		};

		searchservice.removeItem = function(itemindex){
			foundItems.splice(itemindex,1);
		};

		searchservice.getItems = function(){
			return foundItems;
		};
	}

})();
