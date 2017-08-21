import { Component } from '@angular/core';

import { NavController, Platform, ModalController, LoadingController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { SocialSharing } from '@ionic-native/social-sharing';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ContactModalPage } from '../contact-modal/contact-modal';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  items: Array<any> = new Array<any>();
  searchValue: string = "";

  constructor(
    public navCtrl: NavController,
    public platform: Platform,
    public callNumber: CallNumber,
    public socialSharing: SocialSharing,
    public iab: InAppBrowser,
    private contacts: Contacts,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    this.contacts.find(['name'])
    .then( data => {
      this.items = data;
      console.log(data)
    })
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

  openCreateModal(){
    let modal = this.modalCtrl.create(ContactModalPage);
    modal.onDidDismiss(data => {
      this.getData();
      console.log(data);
    });
    modal.present();
  }

  getItems(event){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.contacts.find(['name'], {filter: this.searchValue})
    .then( data => {
      this.items = data;
      loading.dismiss();
    })
  }
}
