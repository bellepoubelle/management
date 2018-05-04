import { Component, OnInit } from '@angular/core';

import { Poubelle } from "../poubelle/poubelle";
import { PoubelleService } from "../poubelle.service";
import { Addresse } from '../addresse/addresse';
import { AddresseService } from "../addresse.service";

declare const google: any;

interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable?: boolean;
}
@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

    poubelles: Poubelle[];
    markers = new Array(4000);
    infowindows = new Array(4000);
    Latlng = new Array(4000);
    map;
    infowindow = null;
    service;



    constructor(private poubelleService: PoubelleService, private addresseService: AddresseService) { }

    ngOnInit() {
        this.poubelleService.log("bonjour");


        var myLatlng = new google.maps.LatLng(45.7614754, 4.8294802);

        var mapOptions = {
            zoom: 12,
            center: myLatlng,
            scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
            styles: [{
                "featureType": "water",
                "stylers": [{
                    "saturation": 43
                }, {
                    "lightness": -11
                }, {
                    "hue": "#0088ff"
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [{
                    "hue": "#ff0000"
                }, {
                    "saturation": -100
                }, {
                    "lightness": 99
                }]
            }, {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "color": "#808080"
                }, {
                    "lightness": 54
                }]
            }, {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ece2d9"
                }]
            }, {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ccdca1"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#767676"
                }]
            }, {
                "featureType": "road",
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#ffffff"
                }]
            }, {
                "featureType": "poi",
                "stylers": [{
                    "visibility": "off"
                }]
            }, {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [{
                    "visibility": "on"
                }, {
                    "color": "#b8cb93"
                }]
            }, {
                "featureType": "poi.park",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.sports_complex",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.medical",
                "stylers": [{
                    "visibility": "on"
                }]
            }, {
                "featureType": "poi.business",
                "stylers": [{
                    "visibility": "simplified"
                }]
            }]

        };


        this.map = new google.maps.Map(document.getElementById("map"), mapOptions);

        this.getPoubelles();
    }


    getPoubelles(): void {
        this.poubelleService.getPoubelles().subscribe(poubelles => {

            var poubelle;
            var index;
            var color;
            var contentString;
            for (let poubelle of poubelles) {
                index = poubelle.id;
                if (index % 5 < 3) {
                    //this.poubelleService.log("begin of for : (index)" + index);
                    this.Latlng[index] = new google.maps.LatLng(poubelle.latitude, poubelle.longitude);

                    if (poubelle.category == 1) {
                        color = '#FC0'; //jaune
                    } else if (poubelle.category == 2) {
                        color = '#0D0'; //vert
                    } else if (poubelle.category == 3) {
                        color = '#777'; //gris
                    } else {
                        color = '#00F'; //erreur
                    }


                    this.markers[index] = (new google.maps.Marker({
                        position: this.Latlng[index],
                        animation: null,
                        icon: {
                            path: google.maps.SymbolPath.CIRCLE,
                            scale: 4 * poubelle.fillingLevel / 100 + 2,
                            strokeColor: color,
                            fillColor: color,
                            fillOpacity: 1,
                            strokeWeight: 1,
                        },
                        map: this.map,
                    }));

                    this.markers[poubelle.id].addListener('click', event => {

                        this.addresseService.getAddresseById(poubelle.address).subscribe(addresse => {
                            if (this.infowindow !== null) {
                                google.maps.event.clearInstanceListeners(this.infowindow);
                                this.infowindow.close();
                                this.infowindow = null;
                            }

                            if (addresse.roadNumber == '') {

                                contentString = '<div>' +
                                    ' <strong> Poubelle No.' + poubelle.id + '</strong>' + '<br>' +
                                    'Remplissage : ' + poubelle.fillingLevel + '%<br>' +
                                    addresse.road + '<br>' + addresse.commune + '</div>'
                            } else {
                                contentString = '<div>' +
                                    ' <strong> Poubelle No.' + poubelle.id + '</strong>' + '<br>' +
                                    'Remplissage : ' + poubelle.fillingLevel + '%<br>' +
                                    addresse.roadNumber + ' ' + addresse.road + '<br>' + addresse.commune + '</div>';
                            }
                            this.infowindow = new google.maps.InfoWindow({
                                content: contentString,
                                map: this.map,
                                position: this.Latlng[poubelle.id],

                            });

                        });;
                    });
                }
            }


            this.poubelles = poubelles;
        });
    }
}
