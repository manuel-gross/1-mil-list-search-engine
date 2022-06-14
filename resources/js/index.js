import {addSearchInput} from "./SearchBarManager.js";

let indexCount = 0;
let hasBeenFilled = false;
let totalList = [];

$("#searchButton").click(async function () {
    for (let index = 0; index < indexCount; index++){
        await asyncRequest(index);
    }
    returnSERP();
});

function asyncRequest(index){
    return new Promise((resolve, reject) => {        
        let searchValue = $(`#searchInput${index}`).val();
        let searchType = String($(`#searchFor${index}`).val());
        let query = {
            "size": 10000,
                "query": {
                    "match":{
                    [searchType] : searchValue
                }
            }
        };

        console.log(searchValue == "")
        if(searchValue == "") return;

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
                let hits = result.hits.hits;
                console.log(hits);
                console.log(hits.length);
                if(hasBeenFilled){
                    totalList = totalList.filter(o1 => hits.some(o2 => o1._id === o2._id));
                }
                else{
                    totalList = hits;
                    hasBeenFilled = true;
                }
                resolve();
            },
            error: function(result) {
                console.log("ERROR");
                reject();
            },
        });
    }, err => {
        console.error("woops:"+ err)
        reject(err);
    }
    
    );
}

function returnSERP(){
    console.log(totalList.length);
    console.log(totalList);
    totalList.slice(0, 50).forEach(element => {
        let base = element._source;
        let el = document.createElement("div");
        el.innerHTML = `<li><span class="values"> ${base.id} </span>`;
        $("#serp").append(el);
    });
    hasBeenFilled = false;
}

$("#addSearchBar").click(function () {
    console.log("whoops");
    addSearchInput(indexCount);
    indexCount++;
});

$("#clearAll").click(function(){
    var inputs = document.getElementById("searchCondition");
    var serp = document.getElementById("serp");
    while (inputs.hasChildNodes()) {
        inputs.removeChild(inputs.firstChild);
    }
    while (serp.hasChildNodes()){
        serp.removeChild(serp.firstChild);
    }
    indexCount = 0;
});

$("#download").click(function(){
    let returnList = totalList.slice(0, 50);
    let json = JSON.stringify(returnList);
    let data = "data:text/json;charset=utf-8," + encodeURIComponent(json)

    let link = document.createElement("a");
    link.setAttribute("href", data);
    link.setAttribute("download", "results.json");
    document.body.appendChild(link);
    link.click();
})

//TODO: add automatic formatting into text file and download 50 files, run over 50 outputs