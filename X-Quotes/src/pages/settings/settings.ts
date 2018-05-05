import {Component} from '@angular/core';
import {NavController, NavParams, Toggle} from 'ionic-angular';
import {SettingsService} from "../../services/settings.service";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private settingsService: SettingsService) {
  }

  ionViewDidLoad() {
  }

  onToggle(toggle: Toggle) {
    this.settingsService.setBackground(toggle.checked);
  }

  isToggle() {
    return this.settingsService.isAltBackground();
  }
}
