import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';

import { MoviesService } from 'src/app/services/movies.service';
import { RatingsService } from '../../services/ratings.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies: Movie[] = [];
  loading = true;

  constructor(private moviesSrv: MoviesService,
              private route: ActivatedRoute,
              private router: Router,
              private ratingsSrv: RatingsService) { }

  ngOnInit() {
    this.getMovies();
    //this.getRating();
  }

  getMovies() {
    this.loading = true;
    this.moviesSrv.getMovies().subscribe(resp => {
      this.movies = resp.movies;
      this.loading = false;
    })
  }

  getRating() {
    this.ratingsSrv.getRatings().subscribe((resp: any) => {
    })
  }

  edit(movie: Movie) {
    this.router.navigate(['/movie', movie._id]);
  }

  rating(movie: Movie) {
    this.router.navigate(['/rating', movie._id]);
  }

  new() {
    this.router.navigate(['/movie', 'new']);
  }


}
