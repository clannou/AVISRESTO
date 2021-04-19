
  function initMap() {

  gMap = new google.maps.Map(document.getElementById('map'));

  navigator.geolocation.getCurrentPosition(function(position) {
    // Center on user's current location if geolocation prompt allowed
    var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    gMap.setCenter(initialLocation);
    gMap.setZoom(16);

// The marker, positioned at Uluru
const marker = new google.maps.Marker({
    position: initialLocation,
    map: gMap,
  });

  }, function(positionError) {
    // User denied geolocation prompt - default to Suresnes
    gMap.setCenter(new google.maps.LatLng(48.869798, 2.219033));
    gMap.setZoom(13);
  });


 
}

var request = new XMLHttpRequest();
request.onreadystatechange = function() {
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response.ratings.comment);
    }
};
request.open("GET", "resto-listing.json");
request.send();

// $.getJSON('C:\Users\chris\OneDrive\Bureau\DEV\P7\resto-listing.json', function (result) {
//   console.log(result);
// });

// function doJSONP(result) {
//     console.log(result.data);
//   }
  
//   let script = document.createElement('script');
//   script.src = 'resto-listing.json'
  
//   document.getElementsByTagName('body')[0].appendChild(script);







