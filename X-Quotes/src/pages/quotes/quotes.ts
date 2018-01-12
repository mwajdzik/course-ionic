import {Component, OnInit} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {Category} from "../../data/category.interface";
import {Quote} from "../../data/quote.interface";
import {QuotesService} from "../../services/quotes.service";

@IonicPage()
@Component({
  selector: 'page-quotes',
  templateUrl: 'quotes.html',
})
export class QuotesPage implements OnInit {

  quoteGroup: Category;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private quotesService: QuotesService,
              private alertController: AlertController) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.quoteGroup = this.navParams.data;
  }

  onAddToFavorites(quote: Quote) {
    const alert = this.alertController.create({
        title: 'Add Quote',
        subTitle: 'Are you sure?',
        message: 'Are you sure you want to add the quote?',
        buttons: [
          {
            text: 'No, I changed my mind', role: 'cancel'
          },
          {
            text: 'Yes, go head', handler: () => {
              this.quotesService.addQuoteToFavorites(quote);
            }
          }
        ]
      }
    );

    alert.present();
  }

  onRemoveFromFavorites(quote: Quote) {
    this.quotesService.removeQuoteFromFavorites(quote);
  }

  isFavorite(quote: Quote) {
    return this.quotesService.isFavorite(quote);
  }
}
