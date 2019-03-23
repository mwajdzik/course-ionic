import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';
import {TextToSpeech} from "@ionic-native/text-to-speech";

@Component({
  selector: 'page-quote',
  templateUrl: 'quote.html',
})
export class QuotePage {

  person: string;
  text: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewController: ViewController,
              private tts: TextToSpeech) {
  }

  ionViewDidLoad() {
    const quote = this.navParams.data;
    this.person = quote.person;
    this.text = quote.text;

    this.tts.speak(this.text)
      .then(() => console.log('Success'))
      .catch((reason: any) => console.log(reason));
  }

  onClose(remove = false) {
    this.viewController.dismiss(remove);
  }
}
