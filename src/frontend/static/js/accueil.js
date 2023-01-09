// import myJson from 'starwars.json' assert {type: 'json'};
function onLoad() {
    document.getElementById("videoListSection").style.display = "none";
}

function boutonRechercher() {
    var input = document.getElementById("rechercher").value;
    var apiKey = "45ca9844fc45d3658b9a4f230f31879951769b3722ad8cf491fb3ba18dee1d66";
    // var url = "https://serpapi.com/search.json?api_key=" + apiKey + "&engine=youtube&search_query=star+wars";
    //console.log(myJson.search_metadata.id);
    // console.log("myJson.search_metadata.id");
    // const data = require('starwars.json');
    callBackGetSuccessLocal();

    
    document.getElementById("videoListSection").style.display = "block";



    // $.get(url, callBackGetSuccess).done(function () {
    // })
    //     .fail(function () {
    //         alert("error");
    //     })
    //     .always(function () {
    //     });
}

var callBackGetSuccess = function (data) {
    console.log("callBackGetSuccess");
}

async function callBackGetSuccessLocal() {
    url = '../static/js/starwars.json';
    let obj, code = "";

    await fetch(url)
        .then((response) => response.json())
        .then((data) => { obj = data; });
    console.log(obj.video_results);

    var videoThumbnail = document.getElementById('zone_videoThumbnail');
    var iPub = 0;
    obj.video_results.forEach(function (element) {
        link = element.link
        title = element.title
        views = element.views

        link = link.replace("watch?v=", "embed/");
        title = title.replace(/&/g, "&amp;")
            .replace(/>/g, "&gt;")
            .replace(/</g, "&lt;")
            .replace(/"/g, "&quot;")
            .replace(/ /g, "&ensp;")
            .replace(/'/g, "&apos;");

        code += "<li class='videoList'>"
            + "<img class='thumbnail' src=\"" + element.thumbnail.static
            + " \" onclick=clickVideo(\"" + link + "\",\"" + title + "\",\"" + views + "\")>"
            + "<div id=\"videoListTitleDiv\"><p class=\"textVideoInfo\">" + title + "</p></div>"
            + "<div id=\"videoListPlateformeDiv\"><p class=\"textVideoInfo\">" + "Youtube" + "</p></div>"
            + "<div id=\"videoListViewsDiv\"><p class=\"textVideoInfo\">" + views + "</p></div>"
            + "<input type=\"button\" class=\"ajouterBouton\" value=\"+\" onclick=\"boutonAjouter()\"/>"
            + "</li>";
            
            console.log("Ipub " + iPub);
            iPub++;
            if (iPub == 3) {
                iPub = 0;
                code += "<li class='videoList'>"
                + "<div id=\"videoListPubDiv\"><p class=\"textVideoInfo\">" + "PUB" + "</p></div>"
                + "</li>";
            }
    })
    videoThumbnail.innerHTML = code;
}

function clickVideo(urlVideo, titleVideo, viewsVideo) {
    const urlObj = { url: urlVideo };
    const urlString = JSON.stringify(urlObj);

    const titleObj = { title: titleVideo };
    const titleString = JSON.stringify(titleObj);

    const viewsObj = { views: viewsVideo };
    const viewsString = JSON.stringify(viewsObj);

    localStorage.setItem('urlVideo', urlString);
    localStorage.setItem('titleVideo', titleString);
    localStorage.setItem('viewsVideo', viewsString);
    window.location.href = "/video";
}