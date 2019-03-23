import {Recipe} from "../model/Recipe";
import {Injectable} from "@angular/core";
import {AngularFirestore} from "angularfire2/firestore";
import {AngularFireAuth} from "angularfire2/auth";

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [];

  constructor(private db: AngularFirestore,
              private afAuth: AngularFireAuth) {
  }

  public addRecipe(item: Recipe) {
    this.recipes.push(item);
  }

  public getRecipes() {
    return this.recipes.slice();
  }

  public updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
  }

  public removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  public storeRecipes() {
    const uid = this.afAuth.auth.currentUser.uid;

    const payload = {
      recipes: this.recipes.map(r => {
        const ingredients = r.ingredients.map(i => {
          return {name: i.name, amount: i.amount}
        });

        return {title: r.title, description: r.description, difficulty: r.difficulty, ingredients}
      })
    };

    return this.db.collection('recipes').doc(uid + 'recipes')
      .set(payload);
  }

  public loadRecipes() {
    const uid = this.afAuth.auth.currentUser.uid;

    return this.db.collection('recipes').doc(uid + 'recipes')
      .valueChanges()
      .map((data: any) => {
        if (data && data.recipes) {
          data.recipes.forEach(r => {
            r.ingredients = r.ingredients || [];
          })
        }
        return data;
      })
      .do((data: any) => {
        this.recipes = data.recipes || [];
      })
  }
}
