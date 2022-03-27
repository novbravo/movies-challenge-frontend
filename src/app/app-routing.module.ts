import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MovieComponent } from './pages/movie/movie.component';
import { UserComponent } from './pages/user/user.component';
import { RatingComponent } from './pages/rating/rating.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { RatingsComponent } from './pages/ratings/ratings.component';
import { AuthGuard } from './guards/auth.guard';
import { MoviesComponent } from './pages/movies/movies.component';

const routes: Routes = [
  { path: 'home', component: RatingsComponent, canActivate: [ AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'movies', component: MoviesComponent, canActivate: [ AuthGuard] },
  { path: 'movie/:id', component: MovieComponent,  canActivate: [ AuthGuard] },
  { path: 'ratings', component: RatingsComponent, canActivate: [ AuthGuard ] },
  { path: 'rating/:id', component: RatingComponent,  canActivate: [ AuthGuard] },
  { path: 'users', component: UserComponent, canActivate: [ AuthGuard ] },
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
