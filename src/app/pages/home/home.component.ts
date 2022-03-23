import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie } from 'src/app/models/movie.model';

import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  loading = true;

  constructor(private moviesSrv: MoviesService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.getMovies();
  }

  getMovies() {
    this.loading = true;
    this.moviesSrv.getMovies().subscribe(resp => {
      this.movies = resp.movies;
      console.log(this.movies);
      this.loading = false;
    })
  }

  edit(movie: Movie) {
    console.log(movie);
    this.router.navigate(['/movie', movie._id]);
  }

  rating(movie: Movie) {
    console.log(movie);
    this.router.navigate(['/rating', movie._id]);
  }

  new() {
    this.router.navigate(['/movie', 'new']);
  }
}
