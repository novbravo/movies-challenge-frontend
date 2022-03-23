import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Movie, MovieResponse } from '../models/movie.model';

import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  url = environment.urlApi;
  constructor(private http: HttpClient) { }

  getMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(this.url + '/movies');
  }

  getMovie(id: string) {
    return this.http.get<Movie>(environment.urlApi + '/movies/' + id);
  }

  postMovie(movie: Movie) {
    console.log(movie);
    return this.http.post<Movie>(environment.urlApi + '/movies', movie);
  }

  putMovie(movie: Movie) {
    console.log(movie);
    return this.http.put<Movie>(environment.urlApi + '/movies/' + movie._id, movie);
  }

}
