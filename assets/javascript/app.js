$(document).ready(function() {
    var queryURL = "https://www.fema.gov/api/open/v1/DisasterDeclarationsSummaries?$orderby=incidentBeginDate%20desc"

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        console.log(response);
    })

})