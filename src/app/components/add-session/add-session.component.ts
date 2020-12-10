import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
})
export class AddSessionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
  }

  public habits: Habit[];
  addForm: FormGroup;

  ngOnInit(): void {
    this.getHabits();
    this.addForm = this.formBuilder.group({
      title: [null, Validators.required],
      summary: [],
      habits: [],
      habit_id: ['', Validators.required],
      capacity: [],
      end_date: [],
      location: [],
      organizer: [],
      start_date: [],
    });
  }

  onSubmit(): void {
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
}

interface Habit {
  id: number;
  title: string;
}
