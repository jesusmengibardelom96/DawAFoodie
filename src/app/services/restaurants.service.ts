import { Injectable } from '@angular/core';
import { Restaurants } from '../models/restaurants.interface';
import { RESTAURANTS } from '../data/data.restaurants';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {
  private items: Restaurants[];
  constructor(private db: FirestoreService) {
    this.items = JSON.parse(sessionStorage.getItem('restaurants'));
  }

  getData() {
    return this.items;
  }

}
