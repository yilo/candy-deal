/* index hbs*/

$(function(){
	
	
	$("#goBtn").click(function(){
		//
		var searchItemSource = $("#search-item-source").html(),
		searchItemTemplate = Handlebars.compile(searchItemSource);
		var searchCategoryVal = $("#searchCategorySelect").val();
		var searchTxt = $("#searchTxt").val();
		$.ajax({
			url: "api/search",
			type: "POST",
			contentType: "application/json",
			success: function(resp){
				$("#searchResultPane").empty();
				var html = searchItemTemplate(resp);
				$("#searchResultPane").html(html);
			}
		});
	});
});