// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ProfileComponent } from 'src/app/pages/profile/profile.component';
import { GroupSessionsApiComponent } from 'src/app/pages/groups-api/group-sessions-api.component';

import { AuthGuard } from '@auth0/auth0-angular';
import {AddSessionComponent} from './components/add-session/add-session.component';
import {HabitsApiComponent} from './pages/habits-api/habits-api.component';
import {AuthenticationCallbackActivateGuard} from './AuthenticationCallbackActivateGuard';
import {AddHabitComponent} from './components/add-habit/add-habit.component';
import {DetailsSessionComponent} from './components/details-session/details-session.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'habits-api',
    component: HabitsApiComponent,
  },
  {
    path: 'groups-api',
    component: GroupSessionsApiComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-session',
    component: AddSessionComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details-session',
    component: DetailsSessionComponent,
    // canActivate: [AuthGuard],
  },
  {
    path: 'add-habit',
    component: AddHabitComponent,
    canActivate: [AuthGuard],
  },
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}



