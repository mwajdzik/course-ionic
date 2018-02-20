import {Ingredient} from "../model/Ingredient";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";
import "rxjs/add/operator/do";

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth) {
  }

  public addItem(item: Ingredient) {
    this.ingredients.push(item);
  }

  public addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  public getItems() {
    return this.ingredients.slice();
  }

  public removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  public storeShoppingList() {
    const uid = this.afAuth.auth.currentUser.uid;

    const payload = {
      ingredients: this.ingredients.map(i => {
        return {name: i.name, amount: i.amount}
      })
    };

    return this.db.collection('recipes').doc(uid)
      .set(payload);
  }

  public loadShoppingList() {
    const uid = this.afAuth.auth.currentUser.uid;

    return this.db.collection('recipes').doc(uid)
      .valueChanges()
      .do((data: any) => {
        this.ingredients = data.ingredients;
      })
  }
}
