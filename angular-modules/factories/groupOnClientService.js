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