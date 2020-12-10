import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-habits-api',
  templateUrl: './habits-api.component.html',
})
export class HabitsApiComponent implements OnInit {
  public habits: Habit[];

  constructor(private router: Router, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getHabits();
  }

  private getHabits(): void {
    this.http
      .get(`${env.dev.serverUrl}/api/habits/all`)
      .subscribe((result: Habit[]) => {
        this.habits = result;
      }, error => console.error(error));
  }

}

interface Habit {
  id: number;
  title: string;
  summary: string;
}
