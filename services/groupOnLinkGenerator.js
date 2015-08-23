var _ = require('underscore')._;
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
				
var linkGenerator = function(){
	var that = this;
	var groupOnDealUrl = "https://partner-int-api.groupon.com/deals.json?";
	var clientId = "bd289feb84b6c5960a7abc2528bd25ea396cd530";//Reporting API key
	
	var conditions = ["tsToken=SG_AFF_0_205944_212528_0","country_code=SG","offset=0","limit=10"];
	
	this.getDealsByPostCode = function(postCode){
		return 'postal_code=' + postCode;
	};
	
	this.getDealsByCategoryCode = function(categoryCode){
		conditions.push('filters=category:' + _.find(groupOnCategoryList, function(item){
			return item.code == categoryCode;
		}).groupOnCategory);	
		return that;
	};
	
	this.resetCondition = function(){
		conditions = ["tsToken=SG_AFF_0_205944_212528_0","country_code=SG","offset=0","limit=10"];
	}
	
	this.build = function(){
		var link = groupOnDealUrl + conditions.join("&");
		that.resetCondition();
		return link;
	};
}

module.exports = linkGenerator;
	
	