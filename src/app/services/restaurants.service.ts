import { Injectable } from '@angular/core';
import { Restaurants } from '../models/restaurants.interface';
import { RESTAURANTS } from '../data/data.restaurants';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private items: Restaurants[] = RESTAURANTS.slice(0);
  constructor() { }

  getData(){
    return this.items;
  }

  filterItems(searchTerm) {
    return this.items.filter(item => {
      return item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    }, item =>{
      return item.type.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
    });
  }
}
