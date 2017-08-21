import { Component } from '@angular/core';

import { NavController, Platform, ViewController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';

@Component({
  selector: 'page-modal',
  templateUrl: 'contact-modal.html'
})
export class ContactModalPage {

  validations_form: FormGroup;

  constructor(
    private contacts: Contacts,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder
  ) {

  }

  ionViewWillLoad(){
    this.validations_form = this.formBuilder.group({
      name: new FormControl('', Validators.required),
      surname: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      contactPage: new FormControl('', Validators.required)
    });
  }

  dismiss() {
   let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
 }

 onSubmit(value){
   debugger
   let contact: Contact = this.contacts.create();
   console.log(contact);

   contact.name = new ContactName(null, value.surname, value.name);
   contact.phoneNumbers = [new ContactField('mobile', value.mobile)];
   contact.contactPage = [new ContactField('contactPage', value.contactPage)];
   contact.save().then(
    () => {
      console.log('Contact saved!', contact);
      this.dismiss();
    },
    (error: any) => console.error('Error saving contact.', error)
    );
  }
}
