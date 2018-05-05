import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {SplashScreen} from '@ionic-native/splash-screen';
import {StatusBar} from '@ionic-native/status-bar';

import {MyApp} from './app.component';
import {FavoritesPage} from "../pages/favorites/favorites";
import {LibraryPage} from "../pages/library/library";
import {QuotesPage} from "../pages/quotes/quotes";
import {SettingsPage} from "../pages/settings/settings";
import {QuotePage} from "../pages/quote/quote";
import {TabsPage} from "../pages/tabs/tabs";
import {QuotesService} from "../services/quotes.service";
import {SettingsService} from "../services/settings.service";
import {TextToSpeech} from "@ionic-native/text-to-speech";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LibraryPage,
    QuotesPage,
    QuotePage,
    SettingsPage,
    FavoritesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LibraryPage,
    QuotesPage,
    QuotePage,
    SettingsPage,
    FavoritesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    QuotesService,
    SettingsService,
    TextToSpeech,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
