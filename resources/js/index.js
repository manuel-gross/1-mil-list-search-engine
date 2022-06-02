$("#searchButton").click(function () {
    let searchValue = $("#searchInput").val();
    let searchType = String($("#searchFor").val());
    let query =
        {
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
                base = element._source;
                el = document.createElement("div");
                el.innerHTML = `<li><span class="values"> ${base.id} ${base.content} ${base.title} ${base['media-type']} ${base.source} ${new Date(base.published)} </span>`;
                $("#serp").prepend(el);
            });
        },
        error: function(result) {
            console.log("ERROR");
        },

    });

});

