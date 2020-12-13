import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-add-habit',
  templateUrl: './add-habit.component.html',
})
export class AddHabitComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
  }

  addFormHabit: FormGroup;

  ngOnInit(): void {
    this.addFormHabit = this.formBuilder.group({
      title: [null, Validators.required],
      summary: [],
    });
  }

  onSubmit(): void {
    this.http.post(`${env.dev.serverUrl}/api/habits/create`, this.addFormHabit.value)
      .subscribe(data => {
        this.router.navigate(['habits-api']);
      });
  }

}

interface Habit {
  id: number;
  title: string;
}
