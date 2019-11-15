import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private firebase: AngularFireDatabase) { }
  customerList: AngularFireList<any>;

  form = new FormGroup({
    $key: new FormControl(null),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    contact: new FormControl('', [Validators.required, Validators.minLength(10)]),
    email: new FormControl('', Validators.required)
  });

  getCustomers() {
    this.customerList = this.firebase.list('customers');
    return this.customerList.snapshotChanges();
  }

  insertCustomer(customer) {
    this.customerList.push({
      firstName: customer.firstName,
      lastName: customer.lastName,
      contact: customer.contact,
      email: customer.email

    });
  }
  populateForm(customer) {
    this.form.setValue(customer);
  }
  updateCustomer(customer) {
    this.customerList.update(customer.$key,
      {
        firstName: customer.firstName,
        lastName: customer.lastName,
        contact: customer.contact,
        email: customer.email
      });

  }
  deleteCustomer($key: string) {
    this.customerList.remove($key);

  }
}
