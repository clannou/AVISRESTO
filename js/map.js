
function initMap() {

  map = new google.maps.Map(document.getElementById('map')); // on récupère la map dans une variable
  
  navigator.geolocation.getCurrentPosition(function(position) {

    // Centrage sur la position de l'utilisateur si geolocalisation activée
    var initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    map.setCenter(initialLocation);
    map.setZoom(16);

    // Marquage sur la position de l'utilisateur
    const marker = new google.maps.Marker({
    position: initialLocation,
    map: map,
    title: 'Vous êtes ici', //le titre au survol de la souris
    });


  }, function(positionError) {
    // Position pour défault à Suresnes si geolocalisation refusée
      map.setCenter(new google.maps.LatLng(48.869798, 2.219033));
      map.setZoom(13);
    }
  );
}