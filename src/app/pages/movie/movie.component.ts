import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from "@angular/forms";

import { NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';


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
 // dateRelease = new Date();
  id = '';
  loading = true;
  dateRelease: NgbDateStruct | undefined;
  date: any;

  constructor(private moviesSrv: MoviesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private calendar: NgbCalendar) { }

  async ngOnInit() {
    //this.dateRelease.day = 1;
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
        const year = new Date(this.movie.release_date).getFullYear();
        const month = new Date(this.movie.release_date).getMonth() + 1;
        const day = new Date(this.movie.release_date).getDate();
        this.dateRelease = {
          year,
          month,
          day
        };
       
        this.loading = false;
      })
    });
  }

  confirm(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.dateRelease?.day !== undefined) {
      const d = this.dateRelease.day + 1;
    }
    this.movie.release_date = (this.dateRelease?.year.toString() + '-' + this.dateRelease?.month.toString() + '-' + this.dateRelease?.day.toString());

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
