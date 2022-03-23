import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'ng-starrating';
import { HomeComponent } from './home/home.component';
import { MovieComponent } from './movie/movie.component';
import { RatingComponent } from './rating/rating.component';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [
    HomeComponent,
    MovieComponent,
    RatingComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RatingModule
  ]
})
export class PagesModule { }
