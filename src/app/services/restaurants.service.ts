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
    this.db.getCollection();
    this.items = JSON.parse(sessionStorage.getItem('restaurants'));
  }

  setDataToFirebase(collection:any[]) {
    for(let o of collection){
      this.db.createAnObject(o);
    }
  }

  getData() {
    return this.items;
  }

}
