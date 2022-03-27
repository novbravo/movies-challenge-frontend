import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingsService } from '../../services/ratings.service';
import { StarRatingComponent } from 'ng-starrating';
import { MoviesService } from '../../services/movies.service';
import { Movie } from 'src/app/models/movie.model';

import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  id = '';
  avg = 0.0;
  cant = 0;
  ratings: any;
  movie = new Movie();
  loading = true;
  testModal: Modal | undefined;
  newValueStar = 0;
  comment = '';

  constructor(private activatedRoute: ActivatedRoute,
              private ratingsSrv: RatingsService,
              private movieSrv: MoviesService,
              private route: Router) {
    this.id = this.activatedRoute.snapshot.params['id'];

    // data movie
    this.movieSrv.getMovie(this.id).subscribe((resp: any) => {
      this.movie = resp.movie;
      this.getRating();      
    })
  }

  getRating() {
    this.ratingsSrv.getRatingsByMovie(this.id).subscribe((resp: any) => {
      this.avg = resp.avg;
      this.cant = resp.ratings.length;
      this.ratings = resp.ratings;
      this.loading = false;
    })
  }

  ngOnInit() {
    
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    this.newValueStar = $event.newValue;
  }

  back() {
    this.route.navigate(['/movies']);
  }

  new() {
    var el_testModal = document.getElementById('testModal');
    if (el_testModal ) {
      this.testModal= new Modal(el_testModal , {
        keyboard: false
      });
    }
    this.testModal?.show();    
  }

  save() {
    const rat = {
      rating: this.newValueStar,
      comment: this.comment,
      movie: this.movie._id,
      user: '6237e51ea547d3f62faa81e3'
    };
    this.ratingsSrv.postRating(rat).subscribe((resp: any) => {
      if (resp.ratingObj._id) {
        this.testModal?.hide();
        this.getRating();
      }
    });
  }
  
}
