import {Component} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../services/recipe";
import {Recipe} from "../../model/Recipe";
import {Ingredient} from "../../model/Ingredient";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {

  mode = 'New';
  recipe: Recipe;
  index: number;

  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(private actionSheetController: ActionSheetController,
              private alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private navCtrl: NavController,
              private navParams: NavParams,
              private recipeService: RecipeService) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');

    if (this.mode === 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }

    this.initializeForm();
  }

  private initializeForm() {
    let title = null;
    let description = null;
    let difficulty = this.difficultyOptions[1];
    let ingredients = [];

    if (this.isEditMode()) {
      title = this.recipe.title;
      description = this.recipe.description;
      difficulty = this.recipe.difficulty;
      ingredients = this.recipe.ingredients.map(i => new FormControl(i.name, Validators.required));
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'difficulty': new FormControl(difficulty, Validators.required),
      'ingredients': new FormArray(ingredients)
    });
  }

  private isEditMode() {
    return this.mode === 'Edit';
  }

  onSubmit() {
    const value = this.recipeForm.value;
    const ingredients = (value.ingredients || [])
      .map(i => new Ingredient(i, 1));

    const newRecipe = new Recipe(value.title, value.description, value.difficulty, ingredients);

    if (this.isEditMode()) {
      this.recipeService.updateRecipe(this.index, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }

    this.navCtrl.popToRoot();
  }

  onManageIngredients() {
    const actionSheet = this.actionSheetController.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Add Ingredient', handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remove All Ingredient', role: 'destructive', handler: () => {
            const formArray = (<FormArray> this.recipeForm.get('ingredients'));
            const len = formArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                formArray.removeAt(i);
              }

              this.toastCtrl.create({
                message: 'All ingredients removed',
                duration: 2000,
                position: 'bottom'
              }).present();
            }
          }
        },
        {
          text: 'Cancel', role: 'cancel'
        }
      ]
    });

    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: 'Add Ingredient',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: (data) => {
            if (data.name == null || data.name.trim() == '') {
              this.toastCtrl.create({
                message: 'Please enter a valid value',
                duration: 2000,
                position: 'bottom'
              }).present();

              return;
            }

            (<FormArray> this.recipeForm.get('ingredients'))
              .push(new FormControl(data.name, Validators.required));

            this.toastCtrl.create({
              message: 'Item added',
              duration: 2000,
              position: 'bottom'
            }).present();
          }
        }
      ]
    });
  }
}
