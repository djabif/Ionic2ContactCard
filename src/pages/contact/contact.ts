import { Component } from '@angular/core';

import { NavController, Platform, ModalController, LoadingController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { EmailComposer } from '@ionic-native/email-composer';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { ContactModalPage } from '../contact-modal/contact-modal';

import * as _ from "underscore";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  items: Array<any> = new Array<any>();
  searchValue: string = "";
  sortedList: Array<any> = new Array<any>();
  currentPage: number = 1;
  itemsPerPage: number = 30;

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

  ionViewWillEnter(){
    this.platform.ready().then(() => {
      this.getData()
    })
  }

  getData(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    // let env = this;
    this.contacts.find(['name'], {multiple: true})
    .then(data => {
      // console.log("data", data);
      this.sortedList = _.sortBy(data, function(res){
        return res.name.formatted;
      });

      this.items = this.sortedList.slice(0, this.itemsPerPage);

      loading.dismiss();
    }, err => {
      console.log("error", err);
      loading.dismiss();
    });
  }

  searchItems(event){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.currentPage = 1;
    loading.present();
    this.contacts.find(['name', 'phoneNumbers'], {filter: this.searchValue, multiple : true})
    .then( data => {

      this.sortedList = _.sortBy(data, function(res){
        return res.name.formatted;
      });

      this.items = this.sortedList.slice(0, this.itemsPerPage);

      loading.dismiss();
    })
  }

  getMoreResults(infiniteScroll){

   for (let i = (this.itemsPerPage * this.currentPage) + 1 ;
    (i <= this.itemsPerPage * (this.currentPage + 1) && i < this.sortedList.length); i++) {
      console.log(i)
     this.items.push( this.sortedList[i]);
   }

   console.log('Async operation has ended');
   infiniteScroll.complete();
   this.currentPage ++;

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
      const browser = this.iab.create(link,'location: yes');
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


}
