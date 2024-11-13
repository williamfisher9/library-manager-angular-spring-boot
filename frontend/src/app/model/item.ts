export class Item {
    id : number;
    name : string;
    year : string;
    rating : string;
    poster : string;
    userId : number;
    watched : boolean;
    type : string;

    constructor(id : number, name : string, year : string, rating : string, poster : string, userId : number, watched : boolean, type : string) {
        this.id = id;
        this.name = name;
        this.poster = poster;
        this.rating = rating;
        this.userId = userId;
        this.year = year;
        this.watched = watched;
        this.type = type;
    }
}
