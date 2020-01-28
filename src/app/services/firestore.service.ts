import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Restaurants } from '../models/restaurants.interface';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private restaurants : Restaurants[];
  constructor(private db : AngularFirestore) { }

  createAnObject(Object: any){
    this.db.doc(`/restaurants/${Object.id}`).set({Object});
  }

  createId(){
    return this.db.createId();
  }

  getCollection(){
    let restaurantsCollection: AngularFirestoreCollection = this.db.collection<Restaurants>('restaurants');
    restaurantsCollection.valueChanges().subscribe(
      res => {
        res.forEach(element => {
          this.restaurants.push(element.restaurants);
        })
      }
    );
    return this.restaurants;
  }

  removeArray(){
    return this.restaurants = [];
  }

  actualizarDatabase(Object:any, restaurants:any){
    this.db.doc(`restaurants/${restaurants.id}`).update({Object});
  }
}
