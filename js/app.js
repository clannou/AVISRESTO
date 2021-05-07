

$( function() {
  $( "#slider-range" ).slider({
    range: true,
    min: 1,
    max: 5,
    values: [ 3, 4 ],
    slide: function( event, ui ) {
      $( "#amount" ).val(ui.values[ 0 ] + " Stars" + " - " + ui.values[ 1 ] + " Stars");
    }
  });
  $( "#amount" ).val($( "#slider-range" ).slider( "values", 0 ) + " Stars" + " - " + $( "#slider-range" ).slider( "values", 1 ) + " Stars");
});

let listing = document.getElementById('listing'); // on récupère le listing dans une variable

 /*RECUPERER VALEURS DU RANGE DANS VARIABLE*/


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
      const longitude = value[i].long;
      const latLng = new google.maps.LatLng(latitude, longitude);
      const image = "restaurantJson.png";

      let marker = new google.maps.Marker({
        position: latLng,
        map: map,
        icon: image,
      });


      let markers = [];

      markers.push(marker)

      console.log(markers)

      
      let restoName = value[i].restaurantName;
      let restoAdress = value[i].address;
      let restoStars
      // let restoAverageStars = value[i].rating.stars

      for (let j = 0; j < value[i].ratings.length; j++) {

        restoStars = value[i].ratings[j].stars;
        console.log(restoStars)

        /*CALCULER LA MOYENNE DES ETOILES PAR RESTAURANTS DANS UNE VARIABLE OU ARRAY*/

        const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">' + restoName + '</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Commentaires : </b>" + value[i].ratings[j].comment + "</p>"
        "</div>" +
        "</div>";
    
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
      });

      marker.addListener("click", () => {
        infowindow.open(map, marker);
      });


      
    

      }


      // marker.addListener("click", () => {
      // $(listing).append('<p>' + "Nom du resto : " + restoName + '<br>' + "Adresse du resto : " + restoAdress + '<br>' + "Moyenne du resto : " + restoStars + '</p>' );
      // });
  

    }
    
    // showVisibleMarkers();
    
  })
  .catch(function(err) {
    console.log("error : " + err)
  });


  function showVisibleMarkers() {
    var bounds = map.getBounds(),
        count = 0;
                  
    for (var i = 0; i < markers.length; i++) {
        var marker = markers[i],
            infoPanel = $('#listing-' + (i+1) ); // array indexes start at zero, but not our class names :)
                                           
        if(bounds.contains(marker.getPosition())===true) {
            infoPanel.show();
            count++;
        }
        else {
            infoPanel.hide();
        }
    }
  }
