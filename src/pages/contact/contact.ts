import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public callNumber: CallNumber,
    public socialSharing: SocialSharing,
    public iab: InAppBrowser) {

  }

  call(){
    this.platform.ready().then(() => {
      this.callNumber.callNumber('phoneNumber', true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
    });
  }

  sendMail(){
    this.platform.ready().then(() => {
      this.socialSharing.canShareViaEmail().then(() => {
        this.socialSharing.shareViaEmail('Body', 'Subject', ['example@example.com']).then(() => {
          console.log('Success!');
        }).catch(() => {
          console.log('Shearing error');
        });
      }).catch(() => {
         console.log('Sharing via email is not possible');
      });
    })
  }

  openInAppBrowser(){
    this.platform.ready().then(() => {
      const browser = this.iab.create('https://google.com/');
    })
  }
}
