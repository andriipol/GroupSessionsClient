import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GroupSessionsClient';
  baseUrl = 'http://localhost:8080/';
  public sessions: Session[];

  constructor(http: HttpClient,) {
    http.get<Session[]>(this.baseUrl + 'sessions').subscribe(result => {
      this.sessions = result;
    }, error => console.error(error));
  }
}

interface Session {
  id: number;
  name: number;
  location: string;
}
