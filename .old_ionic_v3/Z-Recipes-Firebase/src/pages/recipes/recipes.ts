import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {RecipeService} from "../../services/recipe";
import {Recipe} from "../../model/Recipe";
import {RecipePage} from "../recipe/recipe";
import {OptionsPage} from "../database-options/database-options";

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  recipes: Recipe[] = [];

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private popoverController: PopoverController,
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

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({content: 'Please wait...'});
    const popover = this.popoverController.create(OptionsPage);
    popover.present({ev: event});

    popover.onDidDismiss(data => {
      if (data == null) {
        return;
      }

      if (data.action == 'load') {
        loading.present();

        this.recipeService.loadRecipes()
          .take(1)
          .subscribe((data: any) => {
            loading.dismiss();
            this.recipes = data.recipes || [];
          }, error => {
            this.handleError(error.message);
            loading.dismiss();
          });
      }

      if (data.action == 'store') {
        loading.present();

        this.recipeService.storeRecipes()
          .then(data => {
            loading.dismiss();
          })
          .catch(error => {
            this.handleError(error.message);
            loading.dismiss();
          })
      }
    })
  }

  private handleError(errorMessage) {
    const alert = this.alertCtrl.create({
      title: 'An error occured',
      message: errorMessage,
      buttons: ['OK']
    });

    alert.present();
  }
}
