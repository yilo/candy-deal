/*angular style*/

'use strict';
var app = angular.module("dealApp", ["ngRoute"]);
app.config(function ($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});

/**/
var app = angular.module('dealApp');
app.controller('dealSearchCtrl', ['$scope', '$http',function ($scope,$http) {
			$scope.searchResults = [];
			$scope.itemIndex = 0;
			
			$scope.searchDeal = function () {
				var filterCode = $scope.selectedCategoryFilterCode;
				$http.post('api/search').then(function(resp){
					$scope.searchResults = resp.data.items;
					$scope.currentItem = $scope.searchResults[$scope.itemIndex];
				});
			};
			
			$scope.prev = function(){
				if($scope.itemIndex > 0){
					$scope.itemIndex--;
					$scope.currentItem = $scope.searchResults[$scope.itemIndex];
				}
			};
			$scope.next = function(){
				if($scope.searchResults.length > $scope.itemIndex){
					$scope.itemIndex++;
					$scope.currentItem = $scope.searchResults[$scope.itemIndex];
				}
			};

			$scope.categoryFilters = [{
					"code" : 1,
					"name" : "food"
				}, {
					"code" : 2,
					"name" : "shopping"
				}, {
					"code" : 3,
					"name" : "creditcard"
				}
			];
			$scope.selectedCategoryFilterCode = $scope.categoryFilters[0].code;
		}
	]);
