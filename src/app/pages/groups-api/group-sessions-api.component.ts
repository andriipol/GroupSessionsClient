import {Component, NgZone, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment as env} from '../../../environments/environment';
import {Router} from '@angular/router';
import DateTimeFormat = Intl.DateTimeFormat;
import {MapsAPILoader} from '@agm/core';
import LatLngBounds = google.maps.LatLngBounds;


@Component({
  selector: 'app-external-api',
  templateUrl: './group-sessions-api.component.html',
})
export class GroupSessionsApiComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  geoCoder: any;
  public sessions: Session[];
  public geolocationArea: GeolocationArea;


  constructor(private router: Router, private http: HttpClient,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  ngOnInit(): void {
    this.getSessions();
    this.geolocationArea = {latitudeNE: 0, longitudeNE: 0, latitudeSW: 0, longitudeSW: 0};

    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();
    });
  }

  getSessions(): void {
    this.http
      .get(`${env.dev.serverUrl}/api/sessions`)
      .subscribe((result: Session[]) => {
        this.sessions = result;
      }, error => console.error(error));
  }


  deleteSession(session: Session): void {
    this.http.delete(`${env.dev.serverUrl}/api/sessions/delete/` + session.id)
      .subscribe(data => {
        this.sessions = this.sessions.filter(u => u !== session);
      });
  }

  addZoomMeeting(session: Session): void {
    this.http.post(`${env.dev.serverUrl}/api/sessions/id/` + session.id + `/createZoomMeeting`, null)
      .subscribe(data => {
        this.sessions = this.sessions.filter(u => u !== session);
      });
  }

  addSession(): void {
    this.router.navigate(['add-session']);
  }

  findSession(): void {
    this.http
      .post(`${env.dev.serverUrl}/api/sessions/geolocation`, this.geolocationArea)
      .subscribe((result: Session[]) => {
        this.sessions = result;
      }, error => console.error(error));
  }

  getSession(id): void {
    this.router.navigate(['details-session', {id}]);

    // this.http.get(`${env.dev.serverUrl}/api/sessions/id/` + session.id)
    //   .subscribe((result: Session[]) => {
    //     this.sessions = result;
    //   }, error => console.error(error));
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

  boundsChange(latLngBounds: LatLngBounds): void {
    this.geolocationArea.latitudeNE = latLngBounds.getNorthEast().lat();
    this.geolocationArea.longitudeNE = latLngBounds.getNorthEast().lng();
    this.geolocationArea.latitudeSW = latLngBounds.getSouthWest().lat();
    this.geolocationArea.longitudeSW = latLngBounds.getSouthWest().lng();

  }
}

interface Session {
  id: number;
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

interface GeolocationArea {
  longitudeNE: number;
  latitudeNE: number;
  longitudeSW: number;
  latitudeSW: number;
}
