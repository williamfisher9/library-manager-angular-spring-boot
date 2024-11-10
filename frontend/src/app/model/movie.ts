export class Movie {
    Title: string;
    Year: string;
    Rated: string;
    Released: string;
    Runtime: string;
    Genre: string;
    Director: string;
    Writer: string;
    Actors: string;
    Plot: string;
    Language: string;
    Country: string;
    Awards: string;
    Poster: string;
    Ratings: string;
    Metascore: string;
    ImdbRating: string;
    ImdbVotes: string;
    ImdbID: string;
    Type: string;
    DVD: string;
    BoxOffice: string;
    Production: string;
    Website: string;
    Response: string;

    constructor(Title: string,
        Year: string,
        Rated: string,
        Released: string,
        Runtime:string,
        Genre: string,
        Director: string,
        Writer: string,
        Actors: string,
        Plot: string,
        Language: string,
        Country: string,
        Awards: string,
        Poster: string,
        Ratings: string,
        Metascore: string,
        ImdbRating: string,
        ImdbVotes: string,
        ImdbID: string,
        Type: string,
        DVD: string,
        BoxOffice: string,
        Production: string,
        Website: string,
        Response: string) {
            this.Title = Title,
            this.Year = Year,
            this.Rated = Rated,
            this.Released = Released,
            this.Runtime = Runtime,
            this.Genre = Genre,
            this.Director = Director,
            this.Writer = Writer,
            this.Actors = Actors, 
            this.Plot = Plot, 
            this.Language = Language, 
            this.Country = Country, 
            this.Awards = Awards, 
            this.Poster = Poster, 
            this.Ratings = Ratings, 
            this.Metascore = Metascore, 
            this.ImdbRating = ImdbRating, 
            this.ImdbVotes = ImdbVotes, 
            this.ImdbID = ImdbID, 
            this.Type = Type, 
            this.DVD = DVD, 
            this.BoxOffice = BoxOffice, 
            this.Production = Production, 
            this.Website = Website, 
            this.Response = Response
        }
}