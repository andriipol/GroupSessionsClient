import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment as env} from '../../../environments/environment';
import {Router} from '@angular/router';
import DateTimeFormat = Intl.DateTimeFormat;


@Component({
  selector: 'app-external-api',
  templateUrl: './group-sessions-api.component.html',
})
export class GroupSessionsApiComponent implements OnInit {
  public sessions: Session[];

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getSessions();
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
}

interface Session {
  id: number;
  title: string;
  summary: string;
  organizer: string;
  host_email: string;
  join_url: string;
  location: string;
  capacity: number;
  start_date: DateTimeFormat;
  duration: number;
  habit_title: string;
  habit: number;
}
