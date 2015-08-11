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
