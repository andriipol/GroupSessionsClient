// src/app/app.component.ts

import {Component, OnInit} from '@angular/core';

import {AuthService} from '@auth0/auth0-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  constructor(private router: Router, public auth: AuthService) {
  }

  ngOnInit(): void {
    this.router.navigate(['']);
  }
}
