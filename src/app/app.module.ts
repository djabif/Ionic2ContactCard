import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { ContactPage } from '../pages/contact/contact';
import { SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar} from "@ionic-native/status-bar";
import { BrowserModule } from '@angular/platform-browser';
import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';


@NgModule({
  declarations: [
    MyApp,
    ContactPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage
  ],
  providers: [
    SplashScreen,
    StatusBar,
    CallNumber,
    SocialSharing,
    InAppBrowser
  ]
})
export class AppModule {}
