import { Component } from '@angular/core';

import { NavController, Platform } from 'ionic-angular';

import {CallNumber, EmailComposer} from 'ionic-native';

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
      EmailComposer.isAvailable()
      .then(function (isAvailable) {
        console.log(isAvailable);
      })

      let email = {
              to: 'soii_elgonza@hotmail.com',
              cc: 'gonza.digiovanni@gmail.com'
            };
      EmailComposer.open(email);
      console.log(email);
    })
  }

}
