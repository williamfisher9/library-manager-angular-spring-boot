import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { MenuItem } from '../model/menu-item';
import { AppService } from '../services/app.service';
import { DataService } from '../services/data.service';
import { Movie } from '../model/movie';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Rating } from '../model/rating';

@Component({
  selector: 'app-item-details',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './item-details.component.html',
  styleUrl: './item-details.component.css'
})
export class ItemDetailsComponent implements OnInit {
  constructor(private appService : AppService, private dataService : DataService, private route : ActivatedRoute){}

  userId!: string | number;
  username!: string;
  password!: string;  
  itemId! : string | number | null;

  imageUrl! : string;
  year! : string;
  title! : string;
  releaseDate! : string;
  director! : string;
  plot! : string;
  imdbRating! : string;
  ratings! : Rating[]

  menuItems : MenuItem[] = [];
  ngOnInit(): void {
    this.dataService.getUsername.subscribe((res) => (this.username = res));
    this.dataService.getPassword.subscribe((res) => (this.password = res));
    this.dataService.getUserId.subscribe((res) => (this.userId = res));

    this.appService
      .getPrivateMenuItems(this.username, this.password, "details")
      .subscribe((res) => {
        this.menuItems = res.response;
        this.route.queryParamMap.subscribe(params => this.itemId = params.get("itemId"));
        
        this.appService.getItemById(this.itemId, this.username, this.password)
        .subscribe(res => {
          this.imageUrl = JSON.parse(res.details).Poster;
          this.title = JSON.parse(res.details).Title;
          this.year = JSON.parse(res.details).Year;
          this.releaseDate = JSON.parse(res.details).Released;
          this.director = JSON.parse(res.details).Director;
          this.plot = JSON.parse(res.details).Plot;
          this.imdbRating = JSON.parse(res.details).imdbRating;
          this.ratings = JSON.parse(res.details).Ratings;
        });
    });
}
}
