import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list";
import {Ingredient} from "../../model/Ingredient";

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
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
}
