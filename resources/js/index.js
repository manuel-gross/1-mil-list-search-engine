import {addSearchInput} from "./SearchBarManager.js";

let indexCount = 0;

//TODO: Make this a comparison between all the results
//TODO: Add a remove button

$("#searchButton").click(function () {
    for (let index = 0; index < indexCount; index++){
        let searchValue = $(`#searchInput${index}`).val();
        let searchType = String($(`#searchFor${index}`).val());
        let query = {
            "size": 1000,
            "query": {
                "match":{
                    [searchType] : searchValue
	    		}
            }
        };

    $.ajax({
        url: "http://localhost:9200/articles/_search",
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        crossDomain: true,
        data: {
            source: JSON.stringify(query),
            source_content_type:"application/json"
        },
        success: function (result) {
            console.log("SUCCESS");
            console.log(result.hits);
            console.log(result.hits.hits);
            console.log(result.hits.hits.length);
            result.hits.hits.forEach(element => {
                let base = element._source;
                let el = document.createElement("div");
                el.innerHTML = `<li><span class="values"> ${base.id} ${base.content} ${base.title} ${base['media-type']} ${base.source} ${new Date(base.published)} </span>`;
                $("#serp").append(el);
            });
        },
        error: function(result) {
            console.log("ERROR");
        },

    });
    
}

});

$("#addSearchBar").click(function () {
    console.log("whoops");
    addSearchInput(indexCount);
    indexCount++;
});