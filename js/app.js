
window.addEventListener("load", function(event) {

fetch("resto-listing.json") // remplacer path par url https à la fin du projet
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(values) {

      calculAverage(values)
      showComment(values)
      addMarkers(values);
      restoInfoWindow(values);
      addResto(values);
  
      google.maps.event.addListener(map,'idle', function() {
        $(listing).html("");
        $('#resto-count h4 span').html("");
        showVisibleMarkers(values);
      });

      starsFilterSlider(values)
      
    
      // google.maps.event.addListener(map,'idle', function() {
      //   $(listing).html("");
      //   addPlaces(values);
      // });
    })

  .catch(function(err) {
    console.log("error : " + err + ' at line n° ' + err.lineNumber)
  });
})