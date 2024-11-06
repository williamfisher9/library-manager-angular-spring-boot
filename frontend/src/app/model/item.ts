export class Item {
    id : number;
    name : string;
    year : string;
    rating : string;
    poster : string;
    userId : number;

    constructor(id : number, name : string, year : string, rating : string, poster : string, userId : number) {
        this.id = id;
        this.name = name;
        this.poster = poster;
        this.rating = rating;
        this.userId = userId;
        this.year = year;
    }
}
