import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { RatingComponent } from './rating/rating.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule } from '@angular/router';
import { RatingsComponent } from './ratings/ratings.component';
import { MoviesComponent } from './movies/movies.component';

@NgModule({
  declarations: [
    HomeComponent,
    MovieComponent,
    RatingComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    RatingsComponent,
    MoviesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RatingModule,
    RouterModule
  ]
})
export class PagesModule { }
