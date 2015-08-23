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
angular.module('dealApp')
    .filter('to_trusted', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);