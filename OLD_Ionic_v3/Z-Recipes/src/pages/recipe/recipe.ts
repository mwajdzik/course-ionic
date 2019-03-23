import {Component, OnInit} from '@angular/core';
import {NavController, NavParams} from "ionic-angular";
import {RecipeService} from "../../services/recipe";
import {Recipe} from "../../model/Recipe";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list";

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe;
  index: number;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private shoppingListService: ShoppingListService,
              private recipeService: RecipeService) {
  }

  ngOnInit(): void {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onDeleteRecipe() {
    this.recipeService.removeRecipe(this.index);
    this.navCtrl.popToRoot();
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index})
  }

  onAddIngredients() {
    this.shoppingListService.addItems(this.recipe.ingredients);
  }
}
