import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { UserComponent } from './pages/user/user.component';
import { RatingComponent } from './pages/rating/rating.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'users', component: UserComponent },
  { path: 'rating/:id', component: RatingComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  declarations: [],  
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
