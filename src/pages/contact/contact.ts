import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import {CallNumber, SocialSharing } from 'ionic-native';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public platform: Platform) {

  }

  call(){
    this.platform.ready().then(() => {
      CallNumber.callNumber('095787457', true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
    });
  }

  sendMail(){
    this.platform.ready().then(() => {
      SocialSharing.canShareViaEmail().then(() => {
        SocialSharing.shareViaEmail('Body', 'Subject', ['gonza.digiovanni@gmail.com']).then(() => {
          console.log('Success!');
        }).catch(() => {
          console.log('Shearing error');
        });
      }).catch(() => {
         console.log('Sharing via email is not possible');
      });
    })
  }
}
