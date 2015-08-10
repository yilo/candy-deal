/*angular style*/

'use strict';
var app = angular.module("dealApp", ["ngRoute","ngAnimate"]);
app.config(function ($interpolateProvider) {
	$interpolateProvider.startSymbol('{[');
	$interpolateProvider.endSymbol(']}');
});
