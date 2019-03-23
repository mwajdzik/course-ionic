import {Component} from '@angular/core';
import {AlertController, LoadingController, NavController, NavParams, PopoverController} from 'ionic-angular';
import {NgForm} from '@angular/forms';
import {ShoppingListService} from '../../services/shopping-list';
import {Ingredient} from '../../model/Ingredient';
import {OptionsPage} from '../database-options/database-options';
import 'rxjs/add/operator/take';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private popoverController: PopoverController,
              private shoppingListService: ShoppingListService) {
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    const item = new Ingredient(form.value.name, form.value.amount);
    this.shoppingListService.addItem(item);
    form.reset();
    this.loadItems();
  }

  private loadItems() {
    this.ingredients = this.shoppingListService.getItems();
  }

  onDeleteItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItems();
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

        this.shoppingListService.loadShoppingList()
          .take(1)
          .subscribe((data: any) => {
            loading.dismiss();
            this.ingredients = data.ingredients || [];
          }, error => {
            this.handleError(error.message);
            loading.dismiss();
          });
      }

      if (data.action == 'store') {
        loading.present();

        this.shoppingListService.storeShoppingList()
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
