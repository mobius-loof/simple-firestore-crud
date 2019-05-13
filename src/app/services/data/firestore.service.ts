import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Account } from '../../models/account.interface';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public firestore: AngularFirestore) {}

  createAccount(
    fname: string,
    lname: string,
    email: string
  ): Promise<void> {
    const id = this.firestore.createId();

    console.log(id);

    return this.firestore.doc(`trial_accounts/${id}`).set({
      first_name: fname,
      last_name: lname,
      email: email
    });
  }
}
