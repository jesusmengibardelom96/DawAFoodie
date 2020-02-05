import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore'
import { Restaurants } from '../models/restaurants.interface';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  private restaurants : Restaurants[] = [];
  constructor(private db : AngularFirestore) { }

  createAnObject(Restaurants: any){
    this.db.doc(`/restaurants/${Restaurants.id}`).set({Restaurants});
  }

  createId(){
    return this.db.createId();
  }

  getCollection(mail:string){
      let restaurantsCollection: AngularFirestoreCollection = this.db.collection<Restaurants>('restaurants');
      restaurantsCollection.valueChanges().subscribe(
        res => {
          res.forEach(element => {
            if(mail === element.Restaurants.mail)this.restaurants.push(element.Restaurants);
          })
        }
      );
    return this.restaurants;
  }

  getCollectionBlank(){
    let restaurantsCollection: AngularFirestoreCollection = this.db.collection<Restaurants>('restaurants');
    restaurantsCollection.valueChanges().subscribe(
      res => {
        res.forEach(element => {
          this.restaurants.push(element.Restaurants);
        })
      }
    );

    return this.restaurants;
  }

  removeArray(){
    return this.restaurants = [];
  }
  removeARestaurant(restaurantId: string) {
    this.db.doc(`restaurants/${restaurantId}`).delete();
    //return this.getCollection(mail);
  }
  actualizarDatabase(Restaurants:any, restaurants:any){
    this.db.doc(`restaurants/${restaurants.id}`).update({Restaurants});
  }
}
