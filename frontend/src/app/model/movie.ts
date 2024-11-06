export class Movie {
    title: string;
    year: string;
    rated: string;
    released: string;
    runtime: string;
    genre: string;
    director: string;
    writer: string; 
    actors: string; 
    plot: string; 
    language: string; 
    country: string; 
    awards: string; 
    poster: string; 
    ratings: string; 
    metascore: string; 
    imdbRating: string; 
    imdbVotes: string; 
    imdbID: string; 
    type: string; 
    dvd: string; 
    boxOffice: string; 
    production: string; 
    website: string; 
    response: string

    constructor(title: string,
        year: string,
        rated: string,
        released: string,
        runtime:string,
        genre: string,
        director: string,
        writer: string, 
        actors: string, 
        plot: string, 
        language: string, 
        country: string, 
        awards: string, 
        poster: string, 
        ratings: string, 
        metascore: string, 
        imdbRating: string, 
        imdbVotes: string, 
        imdbID: string, 
        type: string, 
        dvd: string, 
        boxOffice: string, 
        production: string, 
        website: string, 
        response: string) {
            this.title = title,
            this.year = year,
            this.rated = rated,
            this.released = released,
            this.runtime = runtime,
            this.genre = genre,
            this.director = director,
            this.writer = writer,
            this.actors = actors, 
            this.plot = plot, 
            this.language = language, 
            this.country = country, 
            this.awards = awards, 
            this.poster = poster, 
            this.ratings = ratings, 
            this.metascore = metascore, 
            this.imdbRating = imdbRating, 
            this.imdbVotes = imdbVotes, 
            this.imdbID = imdbID, 
            this.type = type, 
            this.dvd = dvd, 
            this.boxOffice = boxOffice, 
            this.production = production, 
            this.website = website, 
            this.response = response
        }
}