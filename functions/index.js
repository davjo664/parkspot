// Copyright 2018, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

// Import the Dialogflow module from the Actions on Google client library.
const {
    dialogflow,
    Permission,
    BasicCard,
    Button,
    Image,
    SimpleResponse,
    BrowseCarouselItem,
    BrowseCarousel,
    Suggestions
} = require('actions-on-google');

// import the request module
var request = require('request');

// Import the firebase-functions package for deployment.
const functions = require('firebase-functions');

// Instantiate the Dialogflow client.
const app = dialogflow({debug: true});

// Handle the Dialogflow intent named 'Default Welcome Intent'.
app.intent('Default Welcome Intent', (conv) => {
    conv.ask(new Permission({
    context: 'Hi there, to find the nearest parking spots',
    permissions: 'DEVICE_PRECISE_LOCATION'
}));
conv.ask(new Suggestions(['yes', 'cancel']));
});

function GeoCoding(a, b) {
    request('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + a + ',' + b + '&key=AIzaSyCdTyjpw0JPaTrUb-x_ec5XgBoAfhxKGRM', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var GeoData = JSON.parse(body);
            console.log(GeoData);
            return 'Somalia';
        } else {
            console.log(error);
        }
    });
};

// Handle the Dialogflow intent named 'actions_intent_PERMISSION'. If user
// agreed to PERMISSION prompt, then boolean value 'permissionGranted' is true.
app.intent('actions_intent_PERMISSION', (conv, params, permissionGranted) => {
    if (!permissionGranted) {
    conv.ask('Ok, no worries. Can you tell me a specific area where i should search for Parkspots?');
} else {

    return new Promise(function(resolve, reject) {
        conv.data.longitude = conv.device.location.coordinates.longitude;
        conv.data.latitude = conv.device.location.coordinates.latitude;

        if (!conv.surface.capabilities.has('actions.capability.SCREEN_OUTPUT')) {
            conv.ask('Sorry, try this on a screen device or select the ' +
                'phone surface in the simulator.');
            return;
        }

        //console.log(GeoCoding(conv.data.longitude, conv.data.latitude));

        request('https://parkspot.mi.hdm-stuttgart.de/api/parkspot/' + conv.data.latitude + '/' + conv.data.longitude + '/100', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                //Get only available Parkspots with an maximum Amount of 10
                var availableSpots = JSON.parse(body)
                    .filter(function(it) {
                        return it.available;
                    })
                    .slice(0, 9);

                var items = [];
                console.log('TEST', availableSpots);
                //Send if there is only 1 result
                if (availableSpots.length == 1) {
                    var it = availableSpots[0];
                    conv.ask(new SimpleResponse({
                        speech: 'Great! Here is the result for your location!',
                        text: 'Great! Here is the result for your location!',
                    }));
                    conv.ask(
                        new BasicCard({
                            title: it.street +' '+ it.houseNumber +' '+ it.city,
                            description: 'This is a free Parkspot',
                            image: new Image({
                                url: 'https://maps.googleapis.com/maps/api/staticmap?center=' + it.lat + '+' + it.lng + '&zoom=15.9&scale=1&size=464x256&maptype=roadmap&format=png&visual_refresh=true&markers=size:big|color:0x8affc1|label:P|' + it.lat + '+' + it.lng + '&key=AIzaSyCdTyjpw0JPaTrUb-x_ec5XgBoAfhxKGRM',
                                alt: 'Map of the Parking Location',
                            }),
                            buttons: new Button({
                                title: 'Navigate via Google Maps',
                                url: 'https://www.google.com/maps/search/?api=1&query=' + it.lat + ',' + it.lng,
                            }),
                        })
                    );
                    conv.ask(new Suggestions(['cancel', 'search for other location']));
                }
                //Send if there is more than 1 result
                else if(availableSpots.length > 1) {
                    items = availableSpots
                        .map(function(it) {
                            return new BrowseCarouselItem({
                                title: it.street +' '+ it.houseNumber +' '+ it.city,
                                url: 'https://www.google.com/maps/search/?api=1&query=' + it.lat + ',' + it.lng,
                                description: 'This is a free Parkspot',
                                image: new Image({
                                    url: 'https://maps.googleapis.com/maps/api/staticmap?center=' + it.lat + '+' + it.lng + '&zoom=15.9&scale=1&size=464x256&maptype=roadmap&format=png&visual_refresh=true&markers=size:big|color:0x8affc1|label:P|' + it.lat + '+' + it.lng + '&key=AIzaSyCdTyjpw0JPaTrUb-x_ec5XgBoAfhxKGRM',
                                    alt: 'Map of the Parking Location',
                                }),
                                link: 'Navigate via Google Maps',
                            });
                        });
                    conv.ask(new SimpleResponse({
                        speech: 'Great! Here are the results for your location!',
                        text: 'Great! Here are the results for your location',
                    }));
                    conv.ask(new BrowseCarousel({
                        items: items,
                    }));
                    conv.ask(new Suggestions(['cancel', 'search for other location']));
                } else{
                    conv.ask(new SimpleResponse({
                        speech: 'Sorry, i found no results for your location.',
                        text: 'Sorry, i found no results for your location.',
                    }));
                    conv.ask(new Suggestions(['cancel', 'search for other location']));
                }

                resolve();
            } else {
                reject('Oops something went wrong');
            }
        });
    });

}
});

// Set the DialogflowApp object to handle the HTTPS POST request.
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);

