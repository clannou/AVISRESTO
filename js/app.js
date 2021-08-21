window.addEventListener("load", function (event) {
  let newMap = new map("map");

  fetch("resto-listing.json") // remplacer path par url https à la fin du projet
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (values) {
      let newResto = new resto(values, newMap.map);

      google.maps.event.addListener(newMap.map, "idle", function () {
        for (i = 0; i < newResto.markers.length; i++) {
          newResto.markers[i].setMap(null);
        }

        newResto.showTheRightRestos();
        newResto.addPlaces();
      });
    })

    .catch(function (err) {
      console.log("error : " + err + " at line n° " + err.lineNumber);
    });
});
