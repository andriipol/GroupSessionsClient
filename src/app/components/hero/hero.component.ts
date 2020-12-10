import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
})
export class HeroComponent implements OnInit {
  // heroLogo = 'https://cdn.auth0.com/blog/auth0-angular-sample/assets/logo.png';
  heroLogo = 'https://cdn2.hubspot.net/hubfs/4713221/blog-habits-800.jpg';
  constructor(private router: Router) {}

  ngOnInit(): void {}

  getStarted(): void {
    this.router.navigate(['groups-api']);

  }
}
