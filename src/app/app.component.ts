import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar} from "@ionic-native/status-bar";

import { ContactPage } from '../pages/contact/contact';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage :any = ContactPage;

  constructor(
    platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
