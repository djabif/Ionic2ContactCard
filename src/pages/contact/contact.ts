import { Component } from '@angular/core';

import { NavController, Platform, ModalController, LoadingController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';

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
    public emailComposer: EmailComposer,
    public iab: InAppBrowser,
    private contacts: Contacts,
    public modalCtrl: ModalController,
    public loadingCtrl: LoadingController) {

  }

  ionViewWillLoad(){
    this.getData()
  }

  getData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.contacts.find(['name'])
    .then(data => {
      console.log("data", data);
      debugger;
      this.items = data;
      loading.dismiss();
    }, err => {
      console.log("error", err);
      loading.dismiss();
    });
  }

  call(number){
    this.platform.ready().then(() => {
      this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
    });
  }

  sendMail(){
    this.emailComposer.isAvailable().then(() =>{
      let email = {
        to: 'example@example.com',
        subject: 'Ionicthemes example',
      };
      this.emailComposer.open(email);
    });
  }

  openInAppBrowser(link){
    this.platform.ready().then(() => {
      const browser = this.iab.create(link);
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

  searchItems(event){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    this.contacts.find(['name', 'phoneNumbers'], {filter: this.searchValue})
    .then( data => {
      this.items = data;
      console.log(data)
      loading.dismiss();
    })
  }
}
