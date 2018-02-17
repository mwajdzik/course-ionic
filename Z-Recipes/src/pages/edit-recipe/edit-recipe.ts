import {Component} from '@angular/core';
import {ActionSheetController, AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage {

  mode = 'New';
  difficultyOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;

  constructor(public actionSheetController: ActionSheetController,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.initializeForm();
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
  }

  private initializeForm() {
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'description': new FormControl(null, Validators.required),
      'difficulty': new FormControl(this.difficultyOptions[1], Validators.required),
      'ingredients': new FormArray([])
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
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
