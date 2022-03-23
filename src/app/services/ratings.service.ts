import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RatingsService {

  constructor(private http: HttpClient) { }

  getRatingsByMovie(id: string) {
    return this.http.get(environment.urlApi + '/ratings/' + id);
  }

  postRating(rating: any) {
    return this.http.post(environment.urlApi + '/ratings', rating);
  }
}
