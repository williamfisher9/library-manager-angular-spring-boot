import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { Item } from '../model/item';
import { DataService } from '../services/data.service';
import { FormsModule } from '@angular/forms';
import { MenuComponent } from '../menu/menu.component';
import { MenuItem } from '../model/menu-item';
import { Movie } from '../model/movie';

@Component({
  selector: 'app-user-home',
  standalone: true,
  imports: [FormsModule, MenuComponent],
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css',
})
export class UserHomeComponent implements OnInit {
  userId!: string | number;
  username!: string;
  password!: string;

  hideModal: string = 'hidden';

  items: Item[] = [];

  constructor(
    private appService: AppService,
    private dataService: DataService,
    private router: Router
  ) {}

  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.dataService.getUsername.subscribe((res) => (this.username = res));
    this.dataService.getPassword.subscribe((res) => (this.password = res));
    this.dataService.getUserId.subscribe((res) => (this.userId = res));

    this.appService
      .getPrivateMenuItems(this.username, this.password, 'home')
      .subscribe((res) => {
        this.menuItems = res.response;

        this.appService
          .getUserHome(this.userId, this.username, this.password)
          .subscribe({
            next: (res) => {
              this.items = res.response;
            },
            error: (err) => console.log(err),
          });
      });
  }

  showModal() {
    this.hideModal = 'visible';
  }

  closeModal() {
    this.hideModal = 'hidden';
  }

  inputValue: string = '';
  yearValue: string = '';

  response!: Movie | null;

  searchMovieItem() {
    let hasErrors = false;
    this.errors = {
      name: '',
      credentials: '',
    };

    if (this.inputValue == '') {
      hasErrors = true;
      this.errors.name = 'Name field is required';
    }

    if (!hasErrors) {
      this.dataService.getUsername.subscribe((res) => (this.username = res));
      this.dataService.getPassword.subscribe((res) => (this.password = res));

      this.appService
        .getDetails(
          this.inputValue,
          this.yearValue,
          this.username,
          this.password
        )
        .subscribe({
          next: (res) => {
            if (JSON.parse(res.response).Response == 'False') {
              this.errors.credentials = JSON.parse(res.response).Error;
              this.response = null;
            } else {
              this.response = JSON.parse(res.response);
            }
          },
          error: (err) => {
            this.errors.credentials = 'ERROR!';
          },
        });
    }
  }

  errors = {
    name: '',
    credentials: '',
  };

  addMovieToLibrary(response: any) {
    this.appService
      .createMovieItem(this.userId, this.username, this.password, response)
      .subscribe((res) => {
        if (res.status == 200) {
          this.hideModal = 'hidden';

          this.appService
            .getUserHome(this.userId, this.username, this.password)
            .subscribe({
              next: (res) => {
                this.items = res.response;
              },
              error: (err) => console.log(err),
            });
        }
      });
  }

  moreInfo(itemId: number) {
    this.router.navigate(['/user-home/item-details'], {
      queryParams: { itemId: itemId },
    });
  }

  deleteItem(id: number) {
    this.appService
      .deleteItemById(id, this.username, this.password, this.userId)
      .subscribe((res) => {
        this.items = res.response;
      });
  }

  searchValue: string = '';
  sortDirection : string = "asc";
  sortType : string = "1";

  searchItem() {
    this.appService
      .searchItemByName(
        this.searchValue,
        this.username,
        this.password,
        this.userId
      )
      .subscribe({
        next: (res) => {
          this.items = res;
        },
      });
  }

  handleSortByChange(val : string, direction : string){
    this.sortType = val;
    this.sortDirection = direction;
    if(val == "1"){
      if(direction == "asc"){
        this.items.sort((a, b) => {
          if (a.id < b.id) {
            return -1;
          }
          if (a.id > b.id) {
            return 1;
          }
          return 0;
        });
      } else {
        this.items.sort((a, b) => {
          if (a.id > b.id) {
            return -1;
          }
          if (a.id < b.id) {
            return 1;
          }
          return 0;
        });
      }
    }

    if(val == "2"){
      if(direction == 'asc'){
        this.items.sort((a, b) => {
          if (a.name < b.name) {
            return -1;
          }
          if (a.name > b.name) {
            return 1;
          }
          return 0;
        });
      } else {
        this.items.sort((a, b) => {
          if (a.name > b.name) {
            return -1;
          }
          if (a.name < b.name) {
            return 1;
          }
          return 0;
        });
      }
    }

    

    if(val == "3"){
      if(direction == "asc"){
        this.items.sort((a, b) => {
          if (a.year < b.year) {
            return -1;
          }
          if (a.year > b.year) {
            return 1;
          }
          return 0;
        });
      } else {
        this.items.sort((a, b) => {
          if (a.year > b.year) {
            return -1;
          }
          if (a.year < b.year) {
            return 1;
          }
          return 0;
        });
      }
    }


    if(val == "4"){
      if(direction == 'asc'){
        this.items.sort((a, b) => {
          if (a.rating < b.rating) {
            return -1;
          }
          if (a.rating > b.rating) {
            return 1;
          }
          return 0;
        });
      } else {
        this.items.sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
          if (a.rating < b.rating) {
            return 1;
          }
          return 0;
        });
      }
    }

  }

  
}
