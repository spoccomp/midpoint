// # Place all the behaviors and hooks related to the matching controller here.
// # All this logic will automatically be available in application.js.
// # You can use CoffeeScript in this file: http://coffeescript.org/

 // This example requires the Places library. Include the libraries=places

        // parameter when you first load the API. For example:

        // <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDsqdXJStvxLRM2SytREL8eNw2xC3j6LE8&libraries=places">
        let map;
        let clickHandler;
        function initMap() {
            
            
            map = new google.maps.Map(document.getElementById('map'), {

                mapTypeControl: true,

                //   New York City

                center: { lat: 40.730610, lng: -73.935242 },

                zoom: 13

                

            });
            
            new AutocompleteDirectionsHandler(map);
            clickHandler = new ClickEventHandler(map, origin);

        }

        /**
 
         * @constructor
 
        */
        let POI;
        let ClickEventHandler = function(map, origin) {
        this.origin = origin;
        this.map = map;
        this.directionsService = new google.maps.DirectionsService;
        this.directionsDisplay = new google.maps.DirectionsRenderer;
        this.directionsDisplay.setMap(map);
        this.placesService = new google.maps.places.PlacesService(map);
        this.infowindow = new google.maps.InfoWindow;
        this.infowindowContent = document.getElementById('infowindow-content');
        this.infowindow.setContent(this.infowindowContent);

        // Listen for clicks on the map.
        this.map.addListener('click', this.handleClick.bind(this));
      };

      ClickEventHandler.prototype.handleClick = function(event) {
        POI = event.latLng
        //console.log(POI.lat(), POI.lng());
        
        
        console.log('You clicked on: ' + event.latLng);
        // If the event has a placeId, use it.
        if (event.placeId) {
          console.log('You clicked on place:' + event.placeId);

          // Calling e.stop() on the event prevents the default info window from
          // showing.
          // If you call stop here when there is no placeId you will prevent some
          // other map click event handlers from receiving the event.
          event.stop();
          this.calculateAndDisplayRoute(event.placeId);
          this.getPlaceInformation(event.placeId);
        }
      };

      ClickEventHandler.prototype.calculateAndDisplayRoute = function(placeId) {
        let me = this;
        this.directionsService.route({
          origin: this.origin,
          destination: {placeId: placeId},
          travelMode: 'WALKING'
        }, function(response, status) {
          if (status === 'OK') {
            me.directionsDisplay.setDirections(response);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        });
      };

      ClickEventHandler.prototype.getPlaceInformation = function(placeId) {
        let me = this;
        this.placesService.getDetails({placeId: placeId}, function(place, status) {
          if (status === 'OK') {
            me.infowindow.close();
            me.infowindow.setPosition(place.geometry.location);
            me.infowindowContent.children['place-icon'].src = place.icon;
            me.infowindowContent.children['place-name'].textContent = place.name;
            me.infowindowContent.children['place-id'].textContent = place.place_id;
            me.infowindowContent.children['place-address'].textContent =
                place.formatted_address;
            me.infowindow.open(me.map);
          }
        });
      };
      // Midpoint code -----------------------------------------------------------------

        function AutocompleteDirectionsHandler(map) {

            this.map = map;

            this.originPlaceId = null;

            this.destinationPlaceId = null;

            this.travelMode = 'WALKING';

            let originInput = document.getElementById('origin-input');

            let destinationInput = document.getElementById('destination-input');

            let modeSelector = document.getElementById('mode-selector');

            this.directionsService = new google.maps.DirectionsService;

            this.directionsDisplay = new google.maps.DirectionsRenderer;

            this.directionsDisplay.setMap(map);

            let originAutocomplete = new google.maps.places.Autocomplete(

                originInput, { placeIdOnly: false });

            let destinationAutocomplete = new google.maps.places.Autocomplete(

                destinationInput, { placeIdOnly: false });

            this.setupClickListener('changemode-walking', 'WALKING');

            this.setupClickListener('changemode-transit', 'TRANSIT');

            this.setupClickListener('changemode-driving', 'DRIVING');

            this.setupPlaceChangedListener(originAutocomplete, 'ORIG');

            this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);

            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);

            this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

        }

        // Sets a listener on a radio button to change the filter type on Places

        // Autocomplete.

        AutocompleteDirectionsHandler.prototype.setupClickListener = function (id, mode) {

            let radioButton = document.getElementById(id);

            let me = this;

            radioButton.addEventListener('click', function () {

                me.travelMode = mode;

                me.route();

            });

        };

        AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (autocomplete, mode) {

            let me = this;

            autocomplete.bindTo('bounds', this.map);

            autocomplete.addListener('place_changed', function () {

                let place = autocomplete.getPlace();

                if (!place.place_id) {

                    window.alert("Please select an option from the dropdown list.");

                    return;

                }

                if (mode === 'ORIG') {

                    me.originPlaceId = place.place_id;
                    
                } else {

                    me.destinationPlaceId = place.place_id;

                }

                me.route();

            });

        };

        AutocompleteDirectionsHandler.prototype.route = function  () {

            if (!this.originPlaceId || !this.destinationPlaceId) {

                return;

            }

            let me = this;

            let routeresponse = this.directionsService.route({

                origin: { 'placeId': this.originPlaceId },

                destination: { 'placeId': this.destinationPlaceId },

                travelMode: this.travelMode

            }, function (response, status) {

                if (status === 'OK') {
                    let halfwaydistance;
                    halfwaydistance = (response.routes[0].legs[0].distance.value) / 2;
                    //converting to metres
                    halfwaydistance = halfwaydistance;
                    // let overview = response.routes[0].overview_polyline.GetPointAtDistance(halfwaydistance);

                    let polyline = new google.maps.Polyline({
                        path: [],
                        strokeColor: '#FF0000',
                        strokeWeight: 3
                    });

                    let bounds = new google.maps.LatLngBounds();

                    let legs = response.routes[0].legs;
                    for (i = 0; i < legs.length; i++) {
                        let steps = legs[i].steps;
                        for (j = 0; j < steps.length; j++) {
                            let nextSegment = steps[j].path;
                            for (k = 0; k < nextSegment.length; k++) {
                                polyline.getPath().push(nextSegment[k]);
                                bounds.extend(nextSegment[k]);
                            }
                        }
                    }
                    let start = 0;
                    let start_postion = polyline.GetPointAtDistance(start)
                    // origin = {lat: startposition.lat, lng: startposition.lng}
                    // var marker = new google.maps.Marker({ position: polyline.GetPointAtDistance(halfwaydistance), map: map }).setMap(map);
                    coordinates = polyline.GetPointAtDistance(halfwaydistance);
                    me.directionsDisplay.setDirections(response);
                    // origin = { lat: 40.730610, lng: -73.935242 };
                    
                    clickHandler.origin = {lat: start_postion.lat(),lng: start_postion.lng()};
                    
                
                    // var amap = document.getElementById("map");
                    let marker = new google.maps.Marker({
                        position: coordinates,
                        title: "Mid Point"
                    });
                    marker.setMap(map);





                } else {

                    window.alert('Directions request failed due to ' + status);

                }

            });


        };
