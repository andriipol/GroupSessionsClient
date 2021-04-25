import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {environment as env} from '../../../environments/environment';
import DateTimeFormat = Intl.DateTimeFormat;
import {HttpClient} from '@angular/common/http';
import {AgmMap, MapsAPILoader} from '@agm/core';
import LatLngBounds = google.maps.LatLngBounds;
import LatLng = google.maps.LatLng;
import LatLngLiteral = google.maps.LatLngLiteral;
import MapsEngineMouseEvent = google.maps.visualization.MapsEngineMouseEvent;

@Component({
  selector: 'app-details-session',
  templateUrl: './details-session.component.html',
})
export class DetailsSessionComponent implements OnInit {
  id: any;
  sessionDetails: SessionDetails;
  latitude: number;
  longitude: number;
  zoom: number;
  geoCoder: any;

  neLat: any;
  neLng: any;
  swLat: any;
  swLng: any;
  eclientX: any;
  eclientY: any;
  map: any;
  mapClickListener: any;

  constructor(private router: Router,
              public route: ActivatedRoute, private http: HttpClient,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {

    this.id = this.route.snapshot.paramMap.get('id');

  }

  ngOnInit(): void {
    this.getSession();
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });

  }


  private setCurrentLocation(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 10;

      });
    }
  }

  getSession(): void {
    this.http.get(`${env.dev.serverUrl}/api/sessions/id/` + this.id)
      .subscribe((result: SessionDetails) => {
        this.sessionDetails = result;
      }, error => console.error(error));
  }

  boundsChange(latLngBounds: LatLngBounds): void {
    this.neLat = latLngBounds.getNorthEast().lat();
    this.neLng = latLngBounds.getNorthEast().lng();
    this.swLat = latLngBounds.getSouthWest().lat();
    this.swLng = latLngBounds.getSouthWest().lng();

  }

  /*setMarker(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.ngZone.run(() => {
        // Here we can get correct event
        console.log(e.latLng.lat(), e.latLng.lng());
        this.eclientX = e.latLng.lat();
        this.eclientY = e.latLng.lng();

        this.sessionDetails.latitude = this.eclientX;
        this.sessionDetails.longitude = this.eclientY;

      });
    });
  }*/
}

interface SessionDetails {
  title: string;
  summary: string;
  organizer: string;
  host_email: string;
  join_url: string;
  address: string;
  capacity: number;
  start_date: DateTimeFormat;
  duration: number;
  habit_title: string;
  habit: number;
  longitude: number;
  latitude: number;
}

