import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { Movie } from 'src/app/models/movie.model';

import { MoviesService } from 'src/app/services/movies.service';
import { RatingsService } from '../../services/ratings.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  movies: Movie[] = [];
  loading = false;
  ratings: any[] = [];

  constructor(private ratingsSrv: RatingsService,
              private router: Router) { }

  ngOnInit() {
    this.getRating();
  }

  getRating() {
    this.ratingsSrv.getRatings().subscribe((resp: any) => {
      this.ratings = resp.ratingsAvg;
      console.log(this.ratings);
    })
  }

  newVote(movie: Movie) {
    this.router.navigate(['/rating', movie._id]);
  }
}
