class resto {
  constructor(restos, map) {
    this.restos = restos;
    this.restosList = [];

    this.map = map;

    this.mapBounds;

    this.position = null;

    this.count = 0;
    this.listing = document.getElementById("resto-listing");

    this.restoDescription;
    this.restoDivListing;

    this.restoSumUp = document.getElementById("resto-sum-up");

    this.newCommentSubmit;
    this.newComment;
    this.newStar;
    this.newStarNumber;

    this.contentStringAfterSubmit;

    this.markers = [];
    this.markerWhenCreatingResto = null;

    this.starsFilter();
    this.calculAverageAndJoinComments();
    this.restoPosition();
    this.restosListCreation(restos);
    this.createMarker();

    google.maps.event.addListener(this.map, "tilesloaded ", function () {
      this.showTheRightRestos();
    });

    this.createRestoSumUp();
    this.addResto();
    this.addPlaces();
  }

  starsFilter() {
    $("#slider-range").slider({
      range: true,
      min: 1,
      max: 5,
      values: [1, 5],

      slide: function (event, ui) {
        $("#amount").val(
          ui.values[0] + " Stars" + " - " + ui.values[1] + " Stars"
        );
      },
    });

    $("#amount").val(
      $("#slider-range").slider("values", 0) +
        " Stars" +
        " - " +
        $("#slider-range").slider("values", 1) +
        " Stars"
    );
  }

  calculAverageAndJoinComments() {
    this.restos.forEach((resto) => {
      let average = 0;
      let nbrNote = 0;
      let nbrStarsTotal = 0;

      let commentsArray = [];
      let restoComment;

      resto.ratings.forEach((item) => {
        nbrNote++;
        nbrStarsTotal += item.stars;

        restoComment = "<p>" + item.comment + "</p>";
        commentsArray.push(restoComment);
      });
      average = nbrStarsTotal / nbrNote;

      resto.ratingsAverage = Number.parseFloat(average).toFixed(2);

      if (resto.ratingsAverage == "NaN") {
        resto.ratingsAverage = 0;
      }
      resto.allComments = commentsArray.join("");
    });
  }

  restoPosition() {
    this.restos.forEach((resto) => {
      const latitude = resto.lat;
      const longitude = resto.long;
      const latLng = new google.maps.LatLng(latitude, longitude);
      resto.position = latLng;
      this.position = resto.position;
    });
  }

  restosListCreation(restos) {
    this.restosList = restos;

    $("#slider-range").on(
      "slidechange",
      function (event, ui) {
        this.starMin = ui.values[0];
        this.starMax = ui.values[1];
        this.restosList = [];

        for (i = 0; i < this.markers.length; i++) {
          this.markers[i].setMap(null);
        }

        restos.forEach((resto) => {
          if (
            (resto.ratingsAverage >= this.starMin) &
            (resto.ratingsAverage <= this.starMax)
          ) {
            this.restosList.push(resto);
          }
          this.showTheRightRestos();
        });
      }.bind(this)
    );
  }

  showTheRightRestos() {
    $(this.listing).html("");
    this.count = 0;

    this.mapBounds = this.map.getBounds();

    this.restosList.forEach((resto) => {
      if (this.mapBounds.contains(resto.position)) {
        resto.marker.setMap(this.map);
        this.showRestoOnTheSide(resto);
        this.count++;
      }
    });
    $("#resto-count h4 span").html(this.count);
  }

  createMarker() {
    this.restos.forEach((resto) => {
      const image = "restaurantJson.png";
      let marker = new google.maps.Marker({
        position: resto.position,
        map: this.map,
        icon: image,
      });
      resto.marker = marker;
      this.markers.push(marker);

      resto.marker.addListener("click", () => {
        this.restoSumUpForm(resto);
      });
    });
  }

  showRestoOnTheSide(resto) {
    this.restoDescription = `<p>Nom du resto : ${resto.restaurantName}<br>Adresse du resto : ${resto.address}<br>Note du resto : ${resto.ratingsAverage}</p>`;
    this.restoDivListing = document.createElement("li");
    this.restoDivListing.innerHTML = this.restoDescription;
    resto.divListing = this.listing.appendChild(this.restoDivListing);

    resto.divListing.addEventListener("click", () => {
      this.restoSumUpForm(resto);
    });
  }

  createRestoSumUp() {
    this.restos.forEach((resto) => {
      let streetViewImagesrc =
        "https://maps.googleapis.com/maps/api/streetview?location=" +
        resto.lat +
        "," +
        resto.long +
        "&size=300x200&key=AIzaSyC9hPFyow-eEse7HOUvLgSAv_GhxZ5l1og";

      let contentString = `<div id="content">
    <h1 id="firstHeading">${resto.restaurantName}</h1>
    <div id="restoAverage">Note moyenne du restaurant : ${resto.ratingsAverage} <img src="stars.png"></div>
    <div id="restoStreetView"><img src="${streetViewImagesrc}"></div>
    <div id='bodyContent'><span id='comment-title'>Avis des clients</span><div id='thecomments'>${resto.allComments}</div></div>
    <div id="add-comment-section">Vous souhaitez laisser un avis sur ce resto ?
      <form action="" method="get">
        <div><textarea id="add-comment-input" placeholder=" Indiquez votre commentaire" name="add-comment-input" required rows="4" cols="40"></textarea></div>
        <div>
        <select id="new-star" name="stars" required>
          <option value="">--Choisissez une note--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
        <div><input id="rating-button" type="submit" value="Donnez votre avis sur ce resto !"></div>
      </form>
    </div>
  </div>`;

      resto.contentString = contentString;

      let contentStringAfterSubmit = `
      <div id="message-after-submit">Merci pour votre commentaire, il est à présent rajouté aux notes du resto !</div>`;

      this.contentStringAfterSubmit = contentStringAfterSubmit;
    });
  }

  restoSumUpForm(resto) {
    this.map.setCenter(resto.position);
    $(this.restoSumUp).html(resto.contentString);

    if (this.markerWhenCreatingResto !== null) {
      this.markerWhenCreatingResto.setMap(null);
    }

    this.newCommentSubmit = document.getElementById("rating-button");

    this.newCommentSubmit.addEventListener("click", (e) => {
      this.newComment = document.getElementById("add-comment-input").value;
      this.newStar = document.getElementById("new-star").value;
      this.newStarNumber = Number(this.newStar);

      /* VERIFICATION SI ENVOI DE NEWRATING SANS VALEUR */
      if (
        this.newComment == null ||
        this.newComment == "" ||
        this.newStar == ""
      ) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      } else {
        let newRating = {
          stars: this.newStarNumber,
          comment: this.newComment,
        };

        resto.ratings.push(newRating);
        this.calculAverageAndJoinComments();
        this.showTheRightRestos();
        this.createRestoSumUp();
        $(this.restoSumUp).html(this.contentStringAfterSubmit);
      }
    });
  }

  addResto() {
    let addRestoContentString = `<div id="addRestoContent">
  <h1 id="firstHeading">Ajoutez un resto à cet endroit !</h1>
  <form action="" method="get">
    <div><input id="RestoName" type="text" placeholder="Indiquer le nom du restaurant" required></div>
    <div><input id="RestoAdress"type="text" placeholder="Indiquer l'adresse du restaurant" required></div>
    <div id="RestoFirstRating">
      <div><input id="first-comment" type="text" placeholder="Indiquer votre commentaire" required></div>
      <div>
        <select id="first-star"name="pets" id="pet-select" required>
          <option value="">--Choisissez une note--</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option> 
          <option value="5">5</option>
        </select>
      </div>
    </div>
    <input type="submit" id="new-resto-submit" value="Enregistrer ce restaurant !">
  </form>
</div>`;

    let contentStringAfterSubmit2 = `
      <div id="message-after-submit2">Merci pour votre création, elle est à présent rajoutée aux autres restos !</div>`;

    this.map.addListener("click", (mapsMouseEvent) => {
      let newRestoLat = mapsMouseEvent.latLng.lat();
      let newRestoLong = mapsMouseEvent.latLng.lng();

      this.map.setCenter(mapsMouseEvent.latLng);

      if (this.markerWhenCreatingResto !== null) {
        this.markerWhenCreatingResto.setMap(null);
      }

      this.markerWhenCreatingResto = new google.maps.Marker({
        position: mapsMouseEvent.latLng,
        map: this.map,
        icon: "newrestoicon.png",
        title: "Enregister un nouveau resto sur cette position",
      });

      $(this.restoSumUp).html(addRestoContentString);

      let newRestoSubmit = document.getElementById("new-resto-submit");

      newRestoSubmit.addEventListener("click", (e) => {
        e.preventDefault();

        let newRestoName = document.getElementById("RestoName").value;
        let newRestoAdress = document.getElementById("RestoAdress").value;
        let newRestoFirstComment =
          document.getElementById("first-comment").value;
        let newRestoFirstStar = document.getElementById("first-star").value;
        let newRestoFirstStarNumber = Number(newRestoFirstStar);

        /* VERIFICATION SI ENVOI DE NEWRESTO SANS VALEUR */
        if (
          newRestoName == "" ||
          newRestoAdress == "" ||
          newRestoFirstComment == "" ||
          newRestoFirstStar == ""
        ) {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        } else {
          let newResto = {
            restaurantName: newRestoName,
            address: newRestoAdress,
            lat: newRestoLat,
            long: newRestoLong,
            ratings: [
              {
                stars: newRestoFirstStarNumber,
                comment: newRestoFirstComment,
              },
            ],
          };

          console.log(newResto);

          this.markerWhenCreatingResto.setMap(null);

          this.restosList.push(newResto);

          this.calculAverageAndJoinComments();
          this.restoPosition();
          this.createMarker();
          this.showTheRightRestos();
          this.createRestoSumUp();
          $(this.restoSumUp).html(contentStringAfterSubmit2);
        }
      });
    });
  }

  addPlaces() {
    let boundsForPlaces = this.map.getBounds();

    var request = {
      bounds: boundsForPlaces,
      types: ["restaurant"],
    };

    let service = new google.maps.places.PlacesService(this.map);

    service.nearbySearch(request, callback.bind(this));

    function callback(results, status) {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          let newPlace = {
            restaurantName: results[i].name,
            address: results[i].vicinity,
            lat: results[i].geometry.location.lat(),
            long: results[i].geometry.location.lng(),
            ratings: [
              {
                stars: results[i].rating,
                comment: "",
              },
            ],
          };

          if (
            this.restosList.some((resto) => resto.address === newPlace.address)
          ) {
            console.log("Object found inside the array.");
          } else {
            this.restosList.push(newPlace);
          }
        }
      }

      this.calculAverageAndJoinComments();
      this.restoPosition();
      this.createMarker();
      this.showTheRightRestos();
      this.createRestoSumUp();
    }
  }
}
