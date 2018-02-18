import {Ingredient} from "../model/Ingredient";

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

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
}
