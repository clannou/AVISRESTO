
fetch("resto-listing.json") // remplacer path par url https à la fin du projet
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    // Loop through the results array and place a marker for each set of coordinates.
    for (let i = 0; i < value.length; i++) {

      const latitude = value[i].lat;
      console.log(latitude)

      const longitude = value[i].long;
      console.log(longitude)

      const latLng = new google.maps.LatLng(latitude, longitude);
        
      new google.maps.Marker({
        position: latLng,
        map: map,
      });
    }
  })
  .catch(function(err) {
    console.log("error :" + err)
  });
