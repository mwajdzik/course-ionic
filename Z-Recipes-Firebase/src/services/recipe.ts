import {Recipe} from "../model/Recipe";

export class RecipeService {
  private recipes: Recipe[] = [];

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
}
