var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: 40.6765, lng: -96.7129 },
        mapTypeId: 'terrain'
    })
}
var queryURL = "https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$orderby=incidentBeginDate%20desc"
var counties = []
var disaster = []
var coordinates = []

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function(response) {
    var array = response.DisasterDeclarationsSummaries
    
    for (i=24; i>=0; i--) {
        
        // get county names
        var county = ""
        var countyArea = array[i].declaredCountyArea
        for (j=0; j<countyArea.length; j++) {
            if (countyArea == "Statewide") {
                break
            }
            if (countyArea[j] != "(") {
                county += countyArea[j]
            }
            else {
                break
            }
        }
        county += array[i].state
        counties.push(county)

        //add disaster
        disaster.push(array[i].title + "<br>" + array[i].incidentBeginDate.substring(0, 10))
    }
}).then(function() {
    var count = 0
    // get coordinates of counties
    for (k=0; k<counties.length; k++) {
        var coordURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + counties[k] + "&key=AIzaSyAYbQt20RDLpVEUZC_WPHNQCDRZlURkGmk"
        $.ajax({
            url: coordURL,
            method: "GET"

        }).then(function(Response) {
            coordinates.push(Response.results[0].geometry.location)

            // put marker on the map
            var marker = new google.maps.Marker({
                position: Response.results[0].geometry.location,
                map: map
            })
            marker.setMap(map)
            var contentString = "<div>" + disaster[count] + "</div>"
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            })
            marker.addListener('click', function() {
                infowindow.open(map, marker);
            })
            count++

            setTimeout(function() {}, 1000) // make sure we don't go over the API limits
        })
    }
})