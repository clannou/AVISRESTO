class map {
  constructor(divMap) {
    this.mapDiv = document.getElementById(divMap);
    this.map = new google.maps.Map(this.mapDiv);
    this.defaultLocation = new google.maps.LatLng(48.869798, 2.219033);
    this.initialLocation = "";
    this.initMap();
  }

  initMap() {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Centrage sur la position de l'utilisateur si geolocalisation activée
        this.initialLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        this.map.setCenter(this.initialLocation);
        this.map.setZoom(16);

        // Marquage sur la position de l'utilisateur
        const marker = new google.maps.Marker({
          position: this.initialLocation,
          map: this.map,
          title: "Vous êtes ici", //le titre au survol de la souris
        });
      }.bind(this),
      function (positionError) {
        // Position par défault à Suresnes si geolocalisation refusée
        this.map.setCenter(this.defaultLocation);
        this.map.setZoom(13);
      }.bind(this)
    );
  }
}
