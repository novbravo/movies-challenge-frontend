import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie.model';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie = new Movie();
  dateRelease = new Date();
  id = '';
  loading = true;

  constructor(private moviesSrv: MoviesService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  async ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];
    if (this.id === 'new') {
      this.loading = false;
    } else {
      await this.getMovie();
    }
    
  }

  getMovie = async () => {
    this.loading = true;
    this.activatedRoute.params.subscribe(params => {
      return this.moviesSrv.getMovie(params['id']).toPromise().then((resp: any) => {
        this.movie = resp.movie;
        this.loading = false;
      })
    });
  }

  confirm(form: NgForm) {
    if (form.invalid) {
      console.log('invalid');
      return;
    }
    
    if (this.id === 'new') {
      this.moviesSrv.postMovie(this.movie).subscribe((resp: any) => {
        this.movie = resp.movie;
        if (this.movie._id) {   
          this.sweetAlertMessage(1);
        } else {
          // sweet alert error
          this.sweetAlertMessage(0);
        }
      });
    } else {
      this.moviesSrv.putMovie(this.movie).subscribe((resp: any) => {
        if (resp.movie._id) {
          this.sweetAlertMessage(1);
        } else {
          this.sweetAlertMessage(0);
        }
      });
    }    
  }

  back() {
    this.router.navigate(['/movies']);
  }

  sweetAlertMessage(code: number) {
    if (code === 1 ) {
        Swal.fire({
          icon: 'success',
          title: 'Saved successfully'
        }).then((result) => {
          this.back();
        })  
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!'
      })
    }
  }

}
