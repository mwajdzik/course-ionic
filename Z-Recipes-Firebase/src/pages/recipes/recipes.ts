import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipeService} from "../../services/recipe";
import {Recipe} from "../../model/Recipe";
import {RecipePage} from "../recipe/recipe";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private recipeService: RecipeService) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  public onLoadRecipe(recipe: Recipe, index: number) {
    this.navCtrl.push(RecipePage, {recipe, index});
  }

  private loadItems() {
    this.recipes = this.recipeService.getRecipes();
  }
}
