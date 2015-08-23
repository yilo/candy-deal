//routes configuration

var items = [{
		"id" : "dirk-s-fish-gourmet-shop",
		"uuid" : "cd05b748-f9cb-680f-e491-d9fc088c5e6d",
		"dealLink" : "http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Fdirk-s-fish-gourmet-shop%3Fz%3Dskip%26utm_medium%3Dafl%26utm_source%3DGPN%26utm_campaign%3D201236%26mediaId%3D212556",
		"title" : "$20 for $35 Worth of Fresh and Prepared Fish and Seafood at Dirk's Fish & Gourmet Shop",
		"subtitle" : "43% Off Fresh and Prepared Fish and Seafood",
		"finePrint" : "Limit 2 per person, may buy 1 additional as a gift. Limit 1 per visit. Must purchase a food item. Must use promotional value in 1 visit. Not valid with any other offers or coupons on same day as Groupon use. Not valid for cooking classes.",
		"grid4Image" : "https://img.grouponcdn.com/deal/j2zwZTnqHkCenRbNADsU/v5-2048x1242/v1/t300x182.jpg",
		"grid6Image" : "https://img.grouponcdn.com/deal/j2zwZTnqHkCenRbNADsU/v5-2048x1242/v1/t460x279.jpg",
		"largeImage" : "https://img.grouponcdn.com/deal/j2zwZTnqHkCenRbNADsU/v5-2048x1242/v1/t440x300.jpg",
		"mediumImage" : "https://img.grouponcdn.com/deal/j2zwZTnqHkCenRbNADsU/v5-2048x1242/v1/t100x100.jpg",
		"smallImage" : "https://img.grouponcdn.com/deal/j2zwZTnqHkCenRbNADsU/v5-2048x1242/v1/t50x50.jpg",
		"status" : "open",
		"endAt" : "2015-10-14T04:59:59Z",
		"startAt" : "2015-08-02T05:00:00Z",
		"buyLink" : "https://www.groupon.com/deals/dirk-s-fish-gourmet-shop/confirmation?pledge_id=24871531",
		"redemptionLocation" : "DePaul",
		"price" : "20",
		"discount" : "43"
	}, {
		"id" : "emporium-arcade-bar-logan-square-1",
		"uuid" : "cd05b748-f9cb-680f-e491-d9fc088c5e6d",
		"dealLink" : "http://tracking.groupon.com/r?tsToken=US_AFF_0_201236_212556_0&url=https%3A%2F%2Fwww.groupon.com%2Fdeals%2Femporium-arcade-bar-logan-square-1%3Fz%3Dskip%26utm_medium%3Dafl%26utm_source%3DGPN%26utm_campaign%3D201236%26mediaId%3D212556",
		"title" : "Two Well Drinks and $10 in Tokens at Emporium Arcade Bar (Up to 45% Off). Two Options Available.",
		"subtitle" : "43% Off Fresh and Prepared Fish and Seafood",
		"finePrint" : "May be repurchased every 90 days. Limit 1 per person, may buy 1 additional as gift. Valid only for option purchased. Must be 21 years of age or older. Any day option not valid after 6PM Fridays and Saturdays. Not valid towards beer. Merchant is solely responsible for all sales and delivery of alcohol. Must provide 21+ ID to receive alcoholic beverages..",
		"grid4Image" : "https://img.grouponcdn.com/deal/kcicvt5sg5Hg78jY5nVd/Jv-4113x2468/v1/t300x182.jpg",
		"grid6Image" : "https://img.grouponcdn.com/deal/kcicvt5sg5Hg78jY5nVd/Jv-4113x2468/v1/t460x279.jpg",
		"largeImage" : "https://img.grouponcdn.com/deal/kcicvt5sg5Hg78jY5nVd/Jv-4113x2468/v1/t440x300.jpg",
		"mediumImage" : "https://img.grouponcdn.com/deal/kcicvt5sg5Hg78jY5nVd/Jv-4113x2468/v1/t100x100.jpg",
		"smallImage" : "https://img.grouponcdn.com/deal/kcicvt5sg5Hg78jY5nVd/Jv-4113x2468/v1/t50x50.jpg",
		"status" : "open",
		"endAt" : "2015-10-14T04:59:59Z",
		"startAt" : "2015-08-02T05:00:00Z",
		"buyLink" : "https://www.groupon.com/deals/dirk-s-fish-gourmet-shop/confirmation?pledge_id=24871531",
		"redemptionLocation" : "DePaul",
		"price" : "20",
		"discount" : "43"
	}
];

var request = require('request');
var bodyParser = require('body-parser');
var linkGenerator = require('../services/groupOnLinkGenerator');
var _ = require('underscore')._;
var router = require("express").Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
		extended : true
	}));

router.get('/', function (req, res) {
	res.render("index", {
		title : "candy-deals"
	});
});

router.post('/api/search', function (req, res) {
	var filterCode = req.body.filterCode;
	var generator = new linkGenerator();
	var link = generator.getDealsByCategoryCode(filterCode).build();
	request(link, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var items = [];
			
			var deals = JSON.parse(body).deals; 
			
			_.each(deals, function (deal) {
				
				items.push({
					"id" : deal.id,
					"title" : deal.title,
					"dealUrl" : deal.dealUrl,
					"finePrint" : deal.finePrint,
					"largeImageUrl" : deal.largeImageUrl,
					"endAt" : deal.endAt
				});
			});
			res.json({
				"items" : items
			});
		}
	});

});

module.exports = router;
