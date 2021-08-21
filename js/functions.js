// let listing = document.getElementById("resto-listing");

// let count = 0;

/*CALCUL DE LA MOYENNE DES ETOILES PAR RESTAURANTS ET CREATION PROPRIETE DANS OBJET VALUES*/
// function calculAverage(values){

//     values.forEach( (resto) =>{
//         let average = 0;
//         let nbrNote = 0;
//         let nbrStarsTotal = 0;
//         resto.ratings.forEach( (item) => {
//           nbrNote++;
//           nbrStarsTotal += item.stars;
//         })
//         average = nbrStarsTotal / nbrNote;
//         resto.ratingsAverage = average;
//     })
// }

/*JONCTION DES COMMENTAIRES DE CHAQUE RESTAURANTS ET CREATION PROPRIETE DANS OBJET VALUES*/
// function showComment(values){

//     values.forEach( (resto) =>{

//         let commentsArray = [];
//         let restoComment

//         resto.ratings.forEach((item) =>{
//           restoComment = "<p>" + item.comment + "</p>";
//           commentsArray.push(restoComment)
//         })
//         resto.allComments = commentsArray.join('')
//       })
// }

// function addMarkers(values) {
//   values.forEach((resto) => {
//     const latitude = resto.lat;
//     const longitude = resto.long;
//     const latLng = new google.maps.LatLng(latitude, longitude);
//     const image = "restaurantJson.png";

//     marker = new google.maps.Marker({
//       position: latLng,
//       map: map,
//       icon: image,
//     });
//     resto.marker = marker;
//     resto.position = latLng;
//   });
// }

// function restoInfoWindow(values) {
//   values.forEach((resto) => {
//     let streetViewImagesrc =
//       "https://maps.googleapis.com/maps/api/streetview?location=" +
//       resto.lat +
//       "," +
//       resto.long +
//       "&size=300x200&key=AIzaSyC9hPFyow-eEse7HOUvLgSAv_GhxZ5l1og";

//     const contentString = `<div id="content">
//           <h1 id="firstHeading">${resto.restaurantName}</h1>
//           <div id="restoAverage">Note moyenne du restaurant : ${resto.ratingsAverage} <img src="restostar.png"></div>
//           <div id="restoStreetView"><img src="${streetViewImagesrc}"></div>
//           <div id='bodyContent'><span id='comment-title'>Avis des clients</span><div id='thecomments'>${resto.allComments}</div></div>
//           <div id="add-comment-section">Vous souhaitez laisser un avis sur ce resto ?
//             <form action="" method="get">

//               <div><textarea id="add-comment-input" placeholder=" Indiquer votre commentaire" name="add-comment-input" required rows="4" cols="40"></textarea></div>
//               <div>
//               <select id="new-star"name="pets" id="pet-select" required>
//                 <option value="">--Choisissez une note--</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//               </select>
//             </div>
//               <div><input id="rating-button" type="submit" value="Donnez votre avis sur ce resto !"></div>
//             </form>
//           </div>
//         </div>`;

//     const infowindow = new google.maps.InfoWindow({
//       content: contentString,
//     });

//     resto.marker.addListener("click", () => {
//       // on ferme l'infowindow actuelle si on en ouvre une nouvelle avec un marker
//       if (typeof actualInfoWindow !== "undefined") {
//         actualInfoWindow.close(map, resto.marker);
//       }

//       actualInfoWindow = infowindow;
//       infowindow.open(map, resto.marker);
//       map.setCenter(resto.position);

//       google.maps.event.addListener(infowindow, "domready", () => {
//         let newCommentSubmit = document.getElementById("rating-button");

//         function addRating() {
//           newCommentSubmit.addEventListener("click", (e) => {
//             e.preventDefault();

//             let newComment = document.getElementById("add-comment-input").value;
//             let newStar = document.getElementById("new-star").value;
//             let newStarNumber = Number(newStar);

//             /* LIMITER LA MOYENNE DES NOTES A DEUX CHIFFRES APRES LA VIRGULE*/

//             let newRating = {
//               stars: newStarNumber,
//               comment: newComment,
//             };

//             resto.ratings.push(newRating);
//             calculAverage(values);
//             showComment(values);
//             restoInfoWindow(values);
//             infowindow.close(map);
//             $(listing).html("");
//             showVisibleMarkers(values);
//           });
//         }
//         addRating();
//       });
//     });
//   });
// }

// function addResto(values) {
//   const addRestoContentString = `<div id="addRestoContent">
//         <div id="add-resto-header><h1 id="firstHeading">Ajouter un resto à cet endroit !</h1></div>
//         <form action="" method="get">
//           <div><input id="RestoName" type="text" placeholder="Indiquer le nom du restaurant" required></div>
//           <div><input id="RestoAdress"type="text" placeholder="Indiquer l'adresse du restaurant" required></div>
//           <div id="RestoFirstRating">
//             <div><input id="first-comment" type="text" placeholder="Indiquer votre commentaire" required></div>
//             <div>
//               <select id="first-star"name="pets" id="pet-select" required>
//                 <option value="">--Choisissez une note--</option>
//                 <option value="1">1</option>
//                 <option value="2">2</option>
//                 <option value="3">3</option>
//                 <option value="4">4</option>
//                 <option value="5">5</option>
//               </select>
//             </div>
//           </div>
//           <input type="submit" id="new-resto-submit" value="Enregistrer ce restaurant !">
//         </form>
//       </div>`;

//   map.addListener("click", (mapsMouseEvent) => {
//     // Create a new InfoWindow.
//     const addRestoinfoWindow = new google.maps.InfoWindow({
//       content: addRestoContentString,
//       position: mapsMouseEvent.latLng, // je récupère la LAT/LONG de l'endroit où à cliqué l'utilisateur
//     });

//     let newRestoLat = mapsMouseEvent.latLng.lat();
//     let newRestoLong = mapsMouseEvent.latLng.lng();

//     if (typeof addRestoActualInfoWindow !== "undefined") {
//       addRestoActualInfoWindow.close(map);
//     }

//     addRestoActualInfoWindow = addRestoinfoWindow;
//     addRestoinfoWindow.open(map); // j'ouvre une modal pour demander : NOM RESTO / ADRESSE RESTO / STARS / COMMENT
//     map.setCenter(addRestoinfoWindow.position); // je centre la map sur cet endroit

//     google.maps.event.addListener(addRestoActualInfoWindow, "domready", () => {
//       let newRestoSubmit = document.getElementById("new-resto-submit");

//       newRestoSubmit.addEventListener("click", (e) => {
//         e.preventDefault();

//         let newRestoName = document.getElementById("RestoName").value;
//         let newRestoAdress = document.getElementById("RestoAdress").value;
//         let newRestoFirstComment =
//           document.getElementById("first-comment").value;
//         let newRestoFirstStar = document.getElementById("first-star").value;
//         let newRestoFirstStarNumber = Number(newRestoFirstStar);

//         let newResto = {
//           restaurantName: newRestoName,
//           address: newRestoAdress,
//           lat: newRestoLat,
//           long: newRestoLong,
//           ratings: [
//             {
//               stars: newRestoFirstStarNumber,
//               comment: newRestoFirstComment,
//             },
//           ],
//         };

//         values.push(newResto);
//         addRestoinfoWindow.close(map);

//         calculAverage(values);
//         showComment(values);
//         addMarkers(values);
//         restoInfoWindow(values);
//       });
//     });
//   });
// }

// function showVisibleMarkers(values) {
//   let bounds = map.getBounds();

//   values.forEach((resto) => {
//     let restoDiv = `<p>Nom du resto : ${resto.restaurantName}<br>Adresse du resto : ${resto.address}<br>Note du resto : ${resto.ratingsAverage}</p>`;
//     let restoDivListing = document.createElement("li");
//     restoDivListing.innerHTML = restoDiv;
//     resto.restodivlisting = restoDivListing;

//     if (
//       bounds.contains(resto.position) === true &&
//       resto.marker.setMap(map) != false
//     ) {
//       // ET SI MARKER.SHOW= TRUE

//       listing.appendChild(restoDivListing);
//       count++;
//     } else {
//       $(restoDiv).html("");
//     }
//   });
//   $("#resto-count h4 span").html(count);
// }

// function starsFilterSlider(values) {
//   $("#slider-range").slider({
//     range: true,
//     min: 1,
//     max: 5,
//     values: [1, 5],
//     change: function (event, ui) {},
//     slide: function (event, ui) {
//       $("#amount").val(
//         ui.values[0] + " Stars" + " - " + ui.values[1] + " Stars"
//       );
//     },
//   });

//   $("#slider-range").on("slidechange", function (event, ui) {
//     let starMin = ui.values[0];
//     let starMax = ui.values[1];
//     count = 0;
//     let bounds = map.getBounds();

//     values.forEach((resto) => {
//       if (
//         bounds.contains(resto.position) === true &&
//         (resto.ratingsAverage >= starMin) & (resto.ratingsAverage <= starMax)
//       ) {
//         count++;
//         resto.marker.setMap(map);
//         $(resto.restodivlisting).show();
//         $("#resto-count h4 span").html(count);
//       } else if (
//         (bounds.contains(resto.position) === true &&
//           resto.ratingsAverage <= starMin) ||
//         resto.ratingsAverage >= starMax
//       ) {
//         resto.marker.setMap(null);
//         $(resto.restodivlisting).hide();
//       } else if (
//         (bounds.contains(resto.position) === false &&
//           resto.ratingsAverage <= starMin) ||
//         resto.ratingsAverage >= starMax
//       ) {
//         resto.marker.setMap(null);
//         $(resto.restodivlisting).hide();
//       } else if (
//         bounds.contains(resto.position) === false &&
//         (resto.ratingsAverage >= starMin) & (resto.ratingsAverage <= starMax)
//       ) {
//         resto.marker.setMap(null);
//         $(resto.restodivlisting).hide();
//       }
//     });
//   });

//   $("#amount").val(
//     $("#slider-range").slider("values", 0) +
//       " Stars" +
//       " - " +
//       $("#slider-range").slider("values", 1) +
//       " Stars"
//   );
// }

// function addPlaces(values) {
//   let userview = map.getBounds();

//   console.log(userview);
//   var request = {
//     bounds: userview,
//     types: ["restaurant"],
//   };

//   let service = new google.maps.places.PlacesService(map);

//   service.search(request, callback);

//   function callback(results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         createMarker(results[i]);
//       }
//     }
//   }

// function createMarker(place) {
//   var placeLoc = place.geometry.location;
//   var marker = new google.maps.Marker({
//     map: map,
//     position: placeLoc,
//     icon: "restaurantJson.png",
//   });
//   const li = document.createElement("li");
//   li.innerHTML = `<p>Nom du resto : ${place.name}<br>Adresse du resto : ${place.vicinity}<br>Note du resto : ${place.rating}</p>`;
//   listing.appendChild(li);
//   li.addEventListener("click", () => {
//     map.setCenter(place.geometry.location);
//   });

//   google.maps.event.addListener(marker, "click", function () {
//     const infowindow = new google.maps.InfoWindow({
//       content: `<p>Place name : ${place.name}<br>Place address : ${place.vicinity}<br>Place rating : ${place.rating}</p>`,
//     });
//     if (typeof thisInfowindow !== "undefined") {
//       thisInfowindow.close(map, marker);
//     }
//     thisInfowindow = infowindow;
//     infowindow.open(map, this);
//   });
// }

// let newPlaceinValues = {
//   restaurantName : place.name,
//   address : place.vicinity,
//   lat: place.geometry.location.lat(),
//   long: place.geometry.location.lng(),
// }

// values.push(newPlaceinValues)
//   // console.log(values)
// }
