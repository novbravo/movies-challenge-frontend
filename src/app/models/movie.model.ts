export class MovieResponse {
    movies: Movie[];
    total?: number;

    constructor() {
        this.movies = [],
        this.total = 0
    }
}

export class Movie {
    _id: string;
    title: string;
    release_date: string;
    genre: string;
    plot: string;
    status: boolean;

    constructor() {
        this._id = '';
        this.title = '';
        this.release_date = '';
        this.genre = '';
        this.plot = '',
        this.status = true;
    }
}