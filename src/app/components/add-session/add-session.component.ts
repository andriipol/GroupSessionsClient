import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';
import {MapsAPILoader} from '@agm/core';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
})
export class AddSessionComponent implements OnInit {
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  geoCoder: any;
  map: any;

  neLat: any;
  neLng: any;
  swLat: any;
  swLng: any;
  eclientX: any;
  eclientY: any;
  mapClickListener: any;

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient,
              public mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone) {
  }

  public habits: Habit[];
  addForm: FormGroup;

  ngOnInit(): void {
    this.getHabits();
    this.addForm = this.formBuilder.group({
      title: [null, Validators.required],
      host_email: [null, Validators.required],
      summary: [],
      habits: [],
      habit_id: [null, [Validators.required]],

      capacity: [],
      duration: [],
      address: [],
      longitude: [],
      latitude: [],
      organizer: [],
      start_date: [],
    });

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
        this.zoom = 8;
        // this.getAddress(this.latitude, this.longitude);
      });
    }
  }

  onSubmit(): void {
    if (!this.addForm.valid) {
      alert('Please fill required fields');
      return;
    }
    this.addForm.get('longitude').setValue(this.longitude);
    this.addForm.get('latitude').setValue(this.latitude);
    this.addForm.removeControl('habits');
    this.http.post(`${env.dev.serverUrl}/api/sessions/create`, this.addForm.value)
      .subscribe(data => {
        this.router.navigate(['groups-api']);
      });
  }

  private getHabits(): void {
    this.http
      .get(`${env.dev.serverUrl}/api/habits/all`)
      .subscribe((result: Habit[]) => {
        this.habits = result;
      }, error => console.error(error));
  }

  setMarker(map: google.maps.Map): void {
    this.map = map;
    this.mapClickListener = this.map.addListener('click', (e: google.maps.MouseEvent) => {
      this.ngZone.run(() => {
        // Here we can get correct event
        console.log(e.latLng.lat(), e.latLng.lng());

        this.latitude = e.latLng.lat();
        this.longitude = e.latLng.lng();

      });
    });
  }

}

interface Habit {
  id: number;
  title: string;
}

