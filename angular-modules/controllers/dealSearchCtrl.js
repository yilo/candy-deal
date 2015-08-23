/**/
var app = angular.module('dealApp');

app.controller('dealSearchCtrl', ['$scope', '$http', 'groupOnClientService', '_', '$sce', function ($scope, $http, groupOnClientService, _,$sce) {
			$scope.searchResults = [];
			$scope.itemIndex = 0;

			$scope.searchDeal = function () {
				var filterCode = $scope.selectedCategoryFilterCode;

				/*var link = groupOnClientService.getDealsByCategoryCode(filterCode).build();

				$http.jsonp(link,{"responseType":"json"}).then(function (resp) {
				var deals = resp.data.deals;
				_.each(deals, function (deal) {
				$scope.searchResults.push({
				"id" : deal.id,
				"title" : deal.title,
				"dealUrl" : deal.dealUrl,
				"finePrint" : deal.finePrint,
				"largeImageUrl": deal.largeImageUrl,
				"endAt":deal.endAt
				});
				});
				$scope.searchResults = resp.data.items;
				$scope.currentItem = $scope.searchResults[$scope.itemIndex];
				});*/

				$http.post('api/search', {
					filterCode : filterCode
				}).then(function (resp) {
					
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
