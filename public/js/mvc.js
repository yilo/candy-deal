var underscore = angular.module('underscore', []);
underscore.factory('_', function() { 
    return window._; //Underscore must already be loaded on the page 
});
/*angular style*/

'use strict';
var app = angular.module("dealApp", ["ngRoute","ngAnimate","underscore"]);
app.config(function ($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

var groupOnCategoryList = [{
					"code" : 1,
					"name" : "FOOD",
					"groupOnCategory": "food-and-drink"
				}, {
					"code" : 2,
					"name" : "SHOPPING",
					"groupOnCategory": "shopping"
				}, {
					"code" : 3,
					"name" : "BEAUTY",
					"groupOnCategory":"beauty-and-spas"
				}, {
					"code" : 4,
					"name" : "TRAVEL",
					"groupOnCategory":"travel"
				}];

/**/

var app = angular.module('dealApp');

app.factory('groupOnClientService', ['_',function(_){
	
	var groupOnDealUrl = "https://partner-int-api.groupon.com/deals.json?";
	var clientId = "bd289feb84b6c5960a7abc2528bd25ea396cd530";//Reporting API key
	
	var conditions = ["tsToken=SG_AFF_0_205944_212528_0","country_code=SG"];
	var client = {};	
	client.getDealsByPostCode = function(postCode){
		return 'postal_code=' + postCode;
	};
	
	client.getDealsByCategoryCode = function(categoryCode){
		conditions.push('filters=category:' + _.find(groupOnCategoryList, function(item){
			return item.code == categoryCode;
		}).groupOnCategory);
		return client;
	};
	
	client.resetCondition = function(){
		conditions = ["tsToken=SG_AFF_0_205944_212528_0","country_code=SG"];
	}
	
	client.build = function(){
		var link = groupOnDealUrl + conditions.join("&");
		client.resetCondition();
		return link;
	};
	return client;
}]);
/**/
var app = angular.module('dealApp');

app.controller('dealSearchCtrl', ['$scope', '$http', 'groupOnClientService', function ($scope, $http, groupOnClientService) {
			$scope.searchResults = [];
			$scope.itemIndex = 0;

			$scope.searchDeal = function () {
				var filterCode = $scope.selectedCategoryFilterCode;
				var link = groupOnClientService.getDealsByCategoryCode(filterCode).build();
				
				$http.post('api/search').then(function (resp) {
					$scope.searchResults = resp.data.items;
					$scope.currentItem = $scope.searchResults[$scope.itemIndex];
				});
			};

			$scope.prev = function () {
				if ($scope.itemIndex > 0) {
					$scope.itemIndex--;
					$scope.currentItem = $scope.searchResults[$scope.itemIndex];
				}
			};
			$scope.next = function () {
				if ($scope.searchResults.length > $scope.itemIndex) {
					$scope.itemIndex++;
					$scope.currentItem = $scope.searchResults[$scope.itemIndex];
				}
			};

			$scope.categoryFilters = groupOnCategoryList;

			$scope.selectedCategoryFilterCode = $scope.categoryFilters[0].code;
		}
	]);
